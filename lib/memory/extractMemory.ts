import { addMemories } from "./mem0";

export async function extractAndStoreMemories({
  userId,
  messages,
}: {
  userId: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}) {
  await addMemories({
    userId,
    messages,
    metadata: {
      kind: "conversation",
    },
  });
}
