import { createOpenAI } from "@ai-sdk/openai";
import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";
import { DEFAULT_CHAT_MODEL } from "./models";

const cloudflare = createOpenAI({
  apiKey: "", // Workers AI through Gateway Compat usually doesn't need an OpenAI key if using Gateway token
  baseURL: process.env.CF_AIG_ENDPOINT,
  headers: {
    "cf-aig-authorization": `Bearer ${process.env.CF_AIG_TOKEN}`,
  },
});

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : null;

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  // Explicitly use .chat() to force the OpenAI provider to use /chat/completions
  // instead of falling back to legacy /completions for unknown model IDs.
  return cloudflare.chat(DEFAULT_CHAT_MODEL);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return cloudflare.chat(DEFAULT_CHAT_MODEL);
}

export function getArtifactModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("artifact-model");
  }
  return cloudflare.chat(DEFAULT_CHAT_MODEL);
}
