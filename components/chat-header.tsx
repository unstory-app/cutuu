"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState, useTransition } from "react";
import { useWindowSize } from "usehooks-ts";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { Brain, History, MessageCircleHeart } from "lucide-react";
import { toast } from "./toast";
import { PlusIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const router = useRouter();
  const { open } = useSidebar();
  const [isReflecting, startReflectTransition] = useTransition();
  const [showMemoryPulse, setShowMemoryPulse] = useState(false);

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="sticky top-0 z-20 px-2 py-2 md:px-4 md:py-3">
      <div className="mx-auto flex max-w-5xl items-center gap-2 rounded-[1.75rem] border border-white/70 bg-white/78 px-2 py-2 shadow-[0_18px_42px_rgba(71,44,62,0.08)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/75">
        <SidebarToggle />

        {(!open || windowWidth < 768) && (
          <Button
            className="order-2 ml-auto h-9 rounded-2xl border-white/70 bg-white/85 px-3 text-[#5a4752] shadow-none hover:bg-white md:order-1 md:ml-0 md:h-9 md:px-3 dark:border-zinc-800 dark:bg-zinc-900"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
            variant="outline"
          >
            <PlusIcon />
            <span className="hidden md:inline">New chat</span>
            <span className="md:sr-only">New Chat</span>
          </Button>
        )}

        <div className="min-w-0 flex-1 px-1">
          <div className="flex items-center gap-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-[#fff1e8] text-[#ff8b72] shadow-[0_10px_24px_rgba(255,139,114,0.18)] dark:bg-rose-500/10 dark:text-rose-300">
              <MessageCircleHeart className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium text-[#2b1d28] dark:text-zinc-100">
                {isReadonly ? "Shared conversation" : "Your Cutuu space"}
              </div>
              <div className="truncate text-xs text-[#7c6774] dark:text-zinc-400">
                Calm, continuous chat with memory across sessions
              </div>
            </div>
          </div>
        </div>

        {!isReadonly && (
          <VisibilitySelector
            chatId={chatId}
            className="order-1 md:order-2"
            selectedVisibilityType={selectedVisibilityType}
          />
        )}

        <Button
          variant="outline"
          className="order-3 ml-auto hidden h-9 rounded-2xl border-white/70 bg-white/85 px-3 text-[#5a4752] shadow-none hover:bg-white md:flex dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          onClick={() => {
            startReflectTransition(() => {
              void (async () => {
                try {
                  const res = await fetch("/api/reflect", { method: "POST" });
                  const data = await res.json();

                  if (!res.ok) {
                    toast({
                      type: "error",
                      description: data.message ?? "Reflection failed.",
                    });
                    return;
                  }

                  setShowMemoryPulse(true);
                  window.setTimeout(() => setShowMemoryPulse(false), 1800);
                  toast({
                    type: "success",
                    description:
                      data.message ?? "Reflection complete. Memories updated.",
                  });
                } catch (_error) {
                  toast({
                    type: "error",
                    description: "Reflection failed. Please try again.",
                  });
                }
              })();
            });
          }}
        >
          <Brain className="mr-2 h-4 w-4" />
          {isReflecting ? "Reflecting..." : "Reflect today"}
        </Button>

        <Button
          asChild
          variant="ghost"
          className="order-4 h-9 rounded-2xl px-3 text-[#5a4752] hover:bg-white/80 dark:text-zinc-200 dark:hover:bg-zinc-800/80"
        >
          <Link href="/memories">
            <History
              className={`h-4 w-4 transition-transform duration-300 ${
                showMemoryPulse ? "scale-110 text-[#ff8b72]" : ""
              }`}
            />
            <span className="hidden md:inline">Memories</span>
            <span className="sr-only">Memories</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
