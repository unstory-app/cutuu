import { addMemories, extractProfileFacts } from "./mem0";

export async function extractAndStoreMemories({
  userId,
  messages,
}: {
  userId: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}) {
  const profileFacts = extractProfileFacts(messages);

  const results = await Promise.allSettled([
    addMemories({
      userId,
      messages,
      metadata: {
        kind: "conversation",
      },
    }),
    ...(profileFacts.length > 0
      ? [
          addMemories({
            userId,
            infer: false,
            messages: profileFacts.map((content) => ({
              role: "user" as const,
              content,
            })),
            metadata: {
              kind: "profile_fact",
            },
          }),
        ]
      : []),
  ]);

  const rejectedResult = results.find(
    (result): result is PromiseRejectedResult => result.status === "rejected"
  );

  if (rejectedResult) {
    throw rejectedResult.reason;
  }
}
