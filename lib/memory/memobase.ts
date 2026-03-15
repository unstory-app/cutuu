import { MemoBaseClient } from "@memobase/memobase";

if (!process.env.MEMOBASE_API_KEY) {
  throw new Error("Missing MEMOBASE_API_KEY environment variable");
}

export const memobaseClient = new MemoBaseClient(
  process.env.MEMOBASE_PROJECT_URL || "https://api.memobase.dev",
  process.env.MEMOBASE_API_KEY
);
