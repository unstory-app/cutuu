import { buildMemoryPrompt } from "./mem0";

export async function searchMemories({
  userId,
  query,
}: {
  userId: string;
  query: string;
}) {
  try {
    return await buildMemoryPrompt({
      userId,
      query,
    });
  } catch (error) {
    console.warn("Error searching memories for user:", userId, error);
    return "";
  }
}
