import { generateText } from "ai";
import { getLanguageModel } from "@/lib/ai/providers";
import { saveMemory } from "./saveMemory";

export async function extractAndStoreMemories({
  userId,
  messages,
}: {
  userId: string;
  messages: Array<{ role: string; content: string }>;
}) {
  const conversationString = messages
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  const { text } = await generateText({
    model: getLanguageModel("openai/gpt-4.1-mini"),
    system: `You are a memory extraction assistant. 
    Analyze the conversation and extract long-term memories: important facts, preferences, emotional patterns, or significant life events about the user.
    Return only the memories as a list of concise sentences. 
    If no significant memories are found, return "No memories found".`,
    prompt: `Extract memories from this conversation:\n\n${conversationString}`,
  });

  if (text.trim() === "No memories found") {
    return;
  }

  const memoryLines = text
    .split("\n")
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter((line) => line.length > 0);

  for (const content of memoryLines) {
    await saveMemory({ userId, content });
  }
}
