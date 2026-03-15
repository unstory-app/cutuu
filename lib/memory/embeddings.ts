import { gateway } from "@ai-sdk/gateway";
import { embed, embedMany } from "ai";

export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: gateway.textEmbeddingModel("openai/text-embedding-3-small"),
    value: text,
  });
  return embedding;
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const { embeddings } = await embedMany({
    model: gateway.textEmbeddingModel("openai/text-embedding-3-small"),
    values: texts,
  });
  return embeddings;
}
