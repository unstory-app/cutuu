import { db } from "@/lib/db/queries";
import { memories } from "@/lib/db/schema";
import { generateEmbedding } from "./embeddings";

export async function saveMemory({
  userId,
  content,
}: {
  userId: string;
  content: string;
}) {
  const embedding = await generateEmbedding(content);

  await db.insert(memories).values({
    userId,
    content,
    embedding,
  });
}
