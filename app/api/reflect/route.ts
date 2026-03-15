import { stackServerApp } from "@/stack/server";
import { getMessagesByChatId, getChatsByUserId } from "@/lib/db/queries";
import { extractAndStoreMemories } from "@/lib/memory/extractMemory";
import { ChatbotError } from "@/lib/errors";

export async function POST(request: Request) {
  const user = await stackServerApp.getUser();

  if (!user) {
    return new ChatbotError("unauthorized:api").toResponse();
  }

  try {
    const { chats } = await getChatsByUserId({
      id: user.id,
      limit: 5,
      startingAfter: null,
      endingBefore: null,
    });

    let allMessages: Array<{ role: string; content: string }> = [];

    for (const chat of chats) {
      const messages = await getMessagesByChatId({ id: chat.id });
      allMessages = [
        ...allMessages,
        ...messages.map((m) => ({
          role: m.role,
          content: (m.parts as any)[0].text,
        })),
      ];
    }

    if (allMessages.length === 0) {
      return Response.json({ message: "No recent chats found for reflection." });
    }

    // This extracts key themes and events from the last 5 chats and stores them as memories
    await extractAndStoreMemories({
      userId: user.id,
      messages: allMessages,
    });

    return Response.json({ message: "Reflection complete. Your memories have been updated." });
  } catch (error) {
    console.error("Reflection error:", error);
    return new ChatbotError("offline:api").toResponse();
  }
}
