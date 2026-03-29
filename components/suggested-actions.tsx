"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { memo } from "react";
import { Heart, NotebookText, Sparkles, Sunrise } from "lucide-react";
import type { ChatMessage } from "@/lib/types";
import { Suggestion } from "./elements/suggestion";
import type { VisibilityType } from "./visibility-selector";

type SuggestedActionsProps = {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
  selectedVisibilityType: VisibilityType;
};

function PureSuggestedActions({ chatId, sendMessage }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      label: "Soft check-in",
      prompt: "Can we do a gentle check-in about how I am feeling today?",
      icon: Heart,
    },
    {
      label: "Remember this",
      prompt: "I want you to remember something important about me.",
      icon: Sparkles,
    },
    {
      label: "Plan my day",
      prompt: "Help me make today feel calmer and more doable.",
      icon: Sunrise,
    },
    {
      label: "Journal with me",
      prompt: "Ask me a few warm journal questions and help me reflect.",
      icon: NotebookText,
    },
  ];

  return (
    <div
      className="grid w-full gap-3 sm:grid-cols-2"
      data-testid="suggested-actions"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 14 }}
          key={suggestedAction.prompt}
          transition={{ delay: 0.04 * index }}
        >
          <Suggestion
            className="h-full w-full rounded-[1.75rem] border-white/70 bg-white/72 p-4 text-left text-[#2b1d28] shadow-[0_20px_40px_rgba(71,44,62,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/75 dark:text-zinc-100 dark:hover:bg-zinc-900"
            onClick={(suggestion) => {
              window.history.pushState({}, "", `/chat/${chatId}`);
              sendMessage({
                role: "user",
                parts: [{ type: "text", text: suggestion }],
              });
            }}
            suggestion={suggestedAction.prompt}
          >
            <div className="flex h-full flex-col gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#fff1e8] text-[#ff8b72] shadow-[0_10px_24px_rgba(255,139,114,0.16)] dark:bg-rose-500/10 dark:text-rose-300">
                <suggestedAction.icon className="size-4" />
              </div>
              <div>
                <div className="font-medium">{suggestedAction.label}</div>
                <div className="mt-1 text-sm leading-6 text-[#74616c] dark:text-zinc-300">
                  {suggestedAction.prompt}
                </div>
              </div>
            </div>
          </Suggestion>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) {
      return false;
    }
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType) {
      return false;
    }

    return true;
  }
);
