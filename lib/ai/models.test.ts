import { simulateReadableStream } from "ai";
import type {
  LanguageModelV3GenerateResult,
  LanguageModelV3StreamPart,
  LanguageModelV3Usage,
} from "@ai-sdk/provider";
import { MockLanguageModelV3 } from "ai/test";
import { getResponseChunksByPrompt } from "@/tests/prompts/utils";

const finishReason: LanguageModelV3GenerateResult["finishReason"] = {
  unified: "stop",
  raw: "stop",
};

const mockUsage: LanguageModelV3Usage = {
  inputTokens: { total: 10, noCache: 10, cacheRead: 0, cacheWrite: 0 },
  outputTokens: { total: 20, text: 20, reasoning: 0 },
};

const mockGenerateResult: LanguageModelV3GenerateResult = {
  finishReason,
  usage: mockUsage,
  content: [{ type: "text", text: "Hello, world!" }],
  warnings: [],
};

export const chatModel = new MockLanguageModelV3({
  doGenerate: mockGenerateResult,
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: getResponseChunksByPrompt(prompt),
    }),
  }),
});

export const reasoningModel = new MockLanguageModelV3({
  doGenerate: mockGenerateResult,
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: getResponseChunksByPrompt(prompt, true),
    }),
  }),
});

const titleStreamChunks: LanguageModelV3StreamPart[] = [
  { type: "text-start", id: "1" },
  { type: "text-delta", id: "1", delta: "This is a test title" },
  { type: "text-end", id: "1" },
  { type: "finish", finishReason, usage: mockUsage },
];

const titleGenerateResult: LanguageModelV3GenerateResult = {
  finishReason,
  usage: mockUsage,
  content: [{ type: "text", text: "This is a test title" }],
  warnings: [],
};

export const titleModel = new MockLanguageModelV3({
  doGenerate: titleGenerateResult,
  doStream: async () => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 500,
      initialDelayInMs: 1000,
      chunks: titleStreamChunks,
    }),
  }),
});

export const artifactModel = new MockLanguageModelV3({
  doGenerate: mockGenerateResult,
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 50,
      initialDelayInMs: 100,
      chunks: getResponseChunksByPrompt(prompt),
    }),
  }),
});
