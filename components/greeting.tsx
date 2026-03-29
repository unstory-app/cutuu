import { motion } from "framer-motion";
import { Heart, Sparkles, SunMedium } from "lucide-react";

export const Greeting = () => {
  const notes = [
    "I can remember names, routines, and the tiny details that make future chats feel familiar.",
    "Try sharing what kind of day you are having, what you want to remember, or what would feel helpful right now.",
  ];

  return (
    <div
      className="mx-auto mt-2 flex size-full max-w-4xl flex-col justify-center px-3 md:mt-8 md:px-2"
      key="overview"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/80 p-5 shadow-[0_28px_80px_rgba(71,44,62,0.08)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/75 md:p-7"
        exit={{ opacity: 0, y: 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.15 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd9ce] bg-[#fff7f2] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#a56b7d] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          <Sparkles className="size-3.5" />
          Your chat starts softly
        </div>

        <div className="mt-5 grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <h1 className="font-[family:var(--font-fraunces)] text-4xl leading-none tracking-[-0.04em] text-[#2b1d28] dark:text-zinc-50 md:text-5xl">
              Welcome back.
              <span className="mt-2 block text-[#b65f73] dark:text-rose-300">
                What would feel good to talk through today?
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6f5b67] dark:text-zinc-300">
              This space is designed to feel familiar over time. The more honest
              your check-ins are, the more natural future conversations become.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-[#f3dfd8] bg-[#fff8f4] p-4 dark:border-zinc-700 dark:bg-zinc-800/80">
            <div className="flex items-center gap-2 text-sm font-medium text-[#2b1d28] dark:text-zinc-100">
              <Heart className="size-4 text-[#ff8b72]" />
              Memory-friendly by default
            </div>
            <div className="mt-3 space-y-3">
              {notes.map((note) => (
                <div
                  className="flex items-start gap-3 text-sm leading-6 text-[#6f5b67] dark:text-zinc-300"
                  key={note}
                >
                  <SunMedium className="mt-0.5 size-4 shrink-0 text-[#f0a45c]" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
