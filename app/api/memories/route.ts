import { auth } from "@/app/(auth)/auth";
import { db } from "@/lib/db/queries";
import { memories } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { ChatbotError } from "@/lib/errors";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return new ChatbotError("unauthorized:api").toResponse();
  }

  try {
    const userMemories = await db
      .select()
      .from(memories)
      .where(eq(memories.userId, session.user.id))
      .orderBy(desc(memories.createdAt));

    return Response.json(userMemories);
  } catch (error) {
    console.error("Failed to fetch memories:", error);
    return new ChatbotError("offline:api").toResponse();
  }
}
