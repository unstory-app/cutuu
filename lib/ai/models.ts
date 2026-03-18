// The single source of truth for the application's AI model
export const DEFAULT_CHAT_MODEL =
  "workers-ai/@cf/meta/llama-3.3-70b-instruct-fp8-fast";

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: DEFAULT_CHAT_MODEL,
    name: "Llama 3.3 70B",
    provider: "cloudflare",
    description: "High-performance Llama model via Cloudflare AI Gateway",
  },
];

export const allowedModelIds = new Set(chatModels.map((m) => m.id));

export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
