import { memobaseClient } from "./memobase";

export async function searchMemories({
  userId,
  query,
}: {
  userId: string;
  query: string;
  limit?: number;
}) {
  if (!query) return [];

  const user = await memobaseClient.getUser(userId);
  const context = await user.context(
    500, // maxTokenSize
    undefined, // maxSubtopicSize
    undefined, // preferTopics
    undefined, // onlyTopics
    undefined, // topicLimits
    undefined, // profileEventRatio
    undefined, // requireEventSummary
    undefined, // chats
    undefined, // eventSimilarityThreshold
    "Related past memories about the user:" // customizeContextPrompt
  );

  return context ? [context] : [];
}
