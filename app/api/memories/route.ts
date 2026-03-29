import { stackServerApp } from "@/stack/server";
import { ChatbotError } from "@/lib/errors";
import { getUserMemories } from "@/lib/memory/mem0";

export async function GET() {
  const user = await stackServerApp.getUser();

  if (!user) {
    return new ChatbotError("unauthorized:api").toResponse();
  }

  try {
    const userMemories = await getUserMemories({
      userId: user.id,
      limit: 100,
    });

    return Response.json(
      userMemories.map((memory) => ({
        id: memory.id,
        content: memory.memory,
        createdAt: memory.updated_at || memory.created_at,
        categories: memory.categories ?? [],
      }))
    );
  } catch (error) {
    console.error("Failed to fetch memories:", error);
    return new ChatbotError("offline:api").toResponse();
  }
}
