import { stackServerApp } from "@/stack/server";
import { getMessagesByChatId, getChatsByUserId } from "@/lib/db/queries";
import { extractAndStoreMemories } from "@/lib/memory/extractMemory";
import { ChatbotError } from "@/lib/errors";
import { getTextFromParts } from "@/lib/utils";

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

    let allMessages: Array<{
      role: "user" | "assistant";
      content: string;
    }> = [];

    for (const chat of chats) {
      const messages = await getMessagesByChatId({ id: chat.id });
      allMessages = [
        ...allMessages,
        ...messages.flatMap((message) => {
          const content = getTextFromParts(message.parts);

          if (
            (message.role !== "user" && message.role !== "assistant") ||
            !content
          ) {
            return [];
          }

          return [
            {
              role: message.role as "user" | "assistant",
              content,
            },
          ];
        }),
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
