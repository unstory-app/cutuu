type Mem0Memory = {
  id: string;
  memory: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
  categories?: string[];
};

type Mem0AddEvent = {
  id: string;
  event: "ADD" | "UPDATE" | "DELETE";
  data?: {
    memory?: string;
  };
};

type MemoryMessage = {
  role: "user" | "assistant";
  content: string;
};

type Mem0ResultsEnvelope<T> = {
  results?: T[];
};

const MEM0_BASE_URL = (
  process.env.MEM0_BASE_URL ?? "https://api.mem0.ai"
).replace(/\/+$/, "");
const REDIRECT_STATUS_CODES = new Set([301, 302, 307, 308]);

const MEMORY_INCLUDES = [
  "Stable profile facts like name, nickname, pronouns, age, birthday, and location",
  "Enduring preferences, dislikes, routines, habits, hobbies, and emotional patterns",
  "Ongoing goals, projects, relationships, health constraints, and life context",
  "Corrections to previously stored facts so the latest truth wins",
].join("; ");

const MEMORY_INSTRUCTIONS = [
  "Prioritize durable user-specific facts that will improve future conversations.",
  "Be especially careful to keep identity details like the user's name and preferred way of being addressed.",
  "When the user corrects a fact, update memory to the new value instead of keeping both versions.",
  "Avoid storing generic assistant responses that do not teach anything about the user.",
].join(" ");

const PROFILE_QUERY =
  "What are the user's core profile details, including name, identity, preferences, routines, important relationships, ongoing goals, and persistent life facts?";

function getAuthHeaders() {
  const apiKey = process.env.MEM0_API_KEY;

  if (!apiKey) {
    throw new Error("Missing MEM0_API_KEY environment variable");
  }

  return {
    Authorization: `Token ${apiKey}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

function withWorkspaceScope<T extends Record<string, unknown>>(body: T): T {
  return {
    ...body,
    ...(process.env.MEM0_ORG_ID ? { org_id: process.env.MEM0_ORG_ID } : {}),
    ...(process.env.MEM0_PROJECT_ID
      ? { project_id: process.env.MEM0_PROJECT_ID }
      : {}),
  };
}

function canonicalizeMem0Path(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

async function mem0Fetch<T>(
  path: string,
  body: Record<string, unknown>,
  redirectCount = 0
): Promise<T> {
  const response = await fetch(
    `${MEM0_BASE_URL}${canonicalizeMem0Path(path)}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(withWorkspaceScope(body)),
      cache: "no-store",
      redirect: "manual",
    }
  );

  if (REDIRECT_STATUS_CODES.has(response.status) && redirectCount < 2) {
    const location = response.headers.get("location");

    if (location) {
      const redirectedPath = location.startsWith("http")
        ? new URL(location).pathname
        : location;

      return mem0Fetch<T>(redirectedPath, body, redirectCount + 1);
    }
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Mem0 request failed (${response.status} ${response.statusText}): ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

async function mem0FetchWithFallback<T>(
  paths: string[],
  body: Record<string, unknown>
): Promise<T> {
  let lastError: unknown;

  for (const path of paths) {
    try {
      return await mem0Fetch<T>(path, body);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Mem0 request failed");
}

function unwrapResults<T>(payload: T[] | Mem0ResultsEnvelope<T>): T[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  return Array.isArray(payload.results) ? payload.results : [];
}

function dedupeMemories(memories: Mem0Memory[]) {
  const seen = new Set<string>();

  return memories.filter((memory) => {
    const key = memory.id || memory.memory;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function formatMemoryLine(memory: Mem0Memory) {
  const categories =
    memory.categories && memory.categories.length > 0
      ? ` (${memory.categories.join(", ")})`
      : "";

  return `- ${memory.memory}${categories}`;
}

function cleanFactValue(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/^["'\s]+|["'\s,.!?;:]+$/g, "")
    .trim()
    .slice(0, 120);
}

function hasWordLimit(value: string, maxWords: number) {
  return value.split(/\s+/).filter(Boolean).length <= maxWords;
}

function isLikelyName(value: string) {
  return /^[A-Za-z][A-Za-z' -]*$/.test(value) && hasWordLimit(value, 4);
}

function isLikelyPreference(value: string) {
  return (
    hasWordLimit(value, 6) &&
    !/\b(and|because|but|if|that|when)\b/i.test(value)
  );
}

function isLikelyLocation(value: string) {
  return /^[A-Za-z0-9'., -]+$/.test(value) && hasWordLimit(value, 6);
}

function addFact(
  facts: Set<string>,
  rawValue: string,
  formatter: (value: string) => string,
  validator?: (value: string) => boolean
) {
  const value = cleanFactValue(rawValue);

  if (!value) {
    return;
  }

  if (validator && !validator(value)) {
    return;
  }

  facts.add(formatter(value));
}

export function extractProfileFacts(messages: MemoryMessage[]) {
  const facts = new Set<string>();

  for (const message of messages) {
    if (message.role !== "user") {
      continue;
    }

    const content = message.content.trim();

    if (!content) {
      continue;
    }

    for (const match of content.matchAll(/\bmy name is ([^\n,.!?]+)/gi)) {
      addFact(
        facts,
        match[1],
        (value) => `The user's name is ${value}.`,
        isLikelyName
      );
    }

    for (const match of content.matchAll(
      /\b(?:you can|please) call me ([^\n,.!?]+)/gi
    )) {
      addFact(
        facts,
        match[1],
        (value) => `The user prefers to be called ${value}.`,
        isLikelyName
      );
    }

    for (const match of content.matchAll(/\bmy pronouns are ([^\n,.!?]+)/gi)) {
      addFact(
        facts,
        match[1],
        (value) => `The user's pronouns are ${value}.`,
        (value) => hasWordLimit(value, 4)
      );
    }

    for (const match of content.matchAll(/\bi live in ([^\n.!?]+)/gi)) {
      addFact(
        facts,
        match[1],
        (value) => `The user lives in ${value}.`,
        isLikelyLocation
      );
    }

    for (const match of content.matchAll(/\bi(?:'m| am) from ([^\n.!?]+)/gi)) {
      addFact(
        facts,
        match[1],
        (value) => `The user is from ${value}.`,
        isLikelyLocation
      );
    }

    for (const match of content.matchAll(/\bmy birthday is ([^\n,.!?]+)/gi)) {
      addFact(
        facts,
        match[1],
        (value) => `The user's birthday is ${value}.`,
        (value) => hasWordLimit(value, 6)
      );
    }

    for (const match of content.matchAll(
      /\bi (?:really )?(?:love|like) ([^\n,.!?]+)/gi
    )) {
      addFact(
        facts,
        match[1],
        (value) => `The user likes ${value}.`,
        isLikelyPreference
      );
    }

    for (const match of content.matchAll(
      /\bi (?:really )?(?:hate|dislike|don't like|do not like) ([^\n,.!?]+)/gi
    )) {
      addFact(
        facts,
        match[1],
        (value) => `The user dislikes ${value}.`,
        isLikelyPreference
      );
    }
  }

  return Array.from(facts);
}

export async function addMemories({
  userId,
  messages,
  metadata,
  infer = true,
}: {
  userId: string;
  messages: MemoryMessage[];
  metadata?: Record<string, unknown>;
  infer?: boolean;
}) {
  const trimmedMessages = messages
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }))
    .filter((message) => message.content.length > 0);

  if (trimmedMessages.length === 0) {
    return [];
  }

  const response = await mem0FetchWithFallback<
    Mem0AddEvent[] | Mem0ResultsEnvelope<Mem0AddEvent>
  >(["/v1/memories"], {
    user_id: userId,
    messages: trimmedMessages,
    metadata: {
      source: "cutuu",
      ...metadata,
    },
    infer,
    ...(infer
      ? {
          includes: MEMORY_INCLUDES,
          custom_instructions: MEMORY_INSTRUCTIONS,
        }
      : {}),
    async_mode: false,
    output_format: "v1.1",
    version: "v2",
  });

  return unwrapResults(response);
}

export async function searchMemories({
  userId,
  query,
  limit = 6,
}: {
  userId: string;
  query: string;
  limit?: number;
}) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const response = await mem0FetchWithFallback<
    Mem0Memory[] | Mem0ResultsEnvelope<Mem0Memory>
  >(["/v2/memories/search"], {
    query: trimmedQuery,
    filters: {
      user_id: userId,
    },
    top_k: limit,
    version: "v2",
  });

  return unwrapResults(response);
}

export async function getUserMemories({
  userId,
  limit = 50,
}: {
  userId: string;
  limit?: number;
}) {
  const response = await mem0FetchWithFallback<
    Mem0Memory[] | Mem0ResultsEnvelope<Mem0Memory>
  >(["/v2/memories"], {
    filters: {
      user_id: userId,
    },
    page: 1,
    page_size: limit,
    output_format: "v1.1",
  });

  return unwrapResults(response).sort(
    (a, b) =>
      new Date(b.updated_at || b.created_at).getTime() -
      new Date(a.updated_at || a.created_at).getTime()
  );
}

export async function buildMemoryPrompt({
  userId,
  query,
}: {
  userId: string;
  query: string;
}) {
  const [profileMemories, relevantMemories, recentMemories] = await Promise.all([
    searchMemories({
      userId,
      query: PROFILE_QUERY,
      limit: 4,
    }),
    searchMemories({
      userId,
      query,
      limit: 6,
    }),
    getUserMemories({
      userId,
      limit: 6,
    }),
  ]);

  const memories = dedupeMemories([
    ...profileMemories,
    ...relevantMemories,
    ...recentMemories,
  ]).slice(0, 8);

  if (memories.length === 0) {
    return "";
  }

  return [
    "Long-term memory about the user:",
    ...memories.map(formatMemoryLine),
    "Use these memories naturally. If the user asks what you remember or asks for their name, answer from memory when it is present. If the user corrects a fact, trust the correction.",
  ].join("\n");
}

export type { Mem0Memory, MemoryMessage };
