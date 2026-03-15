import { eq } from "drizzle-orm";
import { db } from "@/lib/db/queries";
import { memories, type Memory } from "@/lib/db/schema";
import { generateEmbedding } from "./embeddings";

export async function searchMemories({
  userId,
  query,
  limit = 5,
}: {
  userId: string;
  query: string;
  limit?: number;
}) {
  if (!query) return [];

  const queryEmbedding = await generateEmbedding(query);

  const allMemories = await db
    .select()
    .from(memories)
    .where(eq(memories.userId, userId));

  const sortedMemories = allMemories
    .map((m: Memory) => {
      const entryEmbedding = m.embedding as number[];
      const similarity = cosineSimilarity(queryEmbedding, entryEmbedding);
      return { ...m, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return sortedMemories;
}

function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (magA * magB);
}
