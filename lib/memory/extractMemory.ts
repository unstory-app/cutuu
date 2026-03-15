import { memobaseClient } from "./memobase";

export async function extractAndStoreMemories({
  userId,
  messages,
}: {
  userId: string;
  messages: Array<{ role: string; content: string }>;
}) {
  // We use memobase's high-level insert which handles extraction and storage automatically
  const blob = {
    type: "chat" as const,
    messages: messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  };

  const user = await memobaseClient.getUser(userId);
  await user.insert(blob);
  await user.flush();
}
