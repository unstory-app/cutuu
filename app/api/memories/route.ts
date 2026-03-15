import { stackServerApp } from "@/stack/server";
import { db } from "@/lib/db/queries";
import { memories } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { ChatbotError } from "@/lib/errors";

export async function GET() {
  const user = await stackServerApp.getUser();

  if (!user) {
    return new ChatbotError("unauthorized:api").toResponse();
  }

  try {
    const userMemories = await db
      .select()
      .from(memories)
      .where(eq(memories.userId, user.id))
      .orderBy(desc(memories.createdAt));

    return Response.json(userMemories);
  } catch (error) {
    console.error("Failed to fetch memories:", error);
    return new ChatbotError("offline:api").toResponse();
  }
}
