import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Heart, LockKeyhole, Sparkles } from "lucide-react";
import { PublicBackground } from "./public-background";

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  helperText: string;
  switchHref: string;
  switchLabel: string;
  switchText: string;
  children: ReactNode;
};

const trustNotes = [
  {
    title: "Private by default",
    description:
      "Your account keeps one steady space for your conversations and memories.",
    icon: LockKeyhole,
  },
  {
    title: "Built for regular check-ins",
    description:
      "Made for the tiny everyday moments, not just one-off prompts.",
    icon: Heart,
  },
  {
    title: "Soft, not noisy",
    description:
      "No feed, no pressure, no performance. Just your own calm little corner.",
    icon: Sparkles,
  },
];

export function AuthShell({
  badge,
  title,
  description,
  helperText,
  switchHref,
  switchLabel,
  switchText,
  children,
}: AuthShellProps) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fffaf4] text-[#2b1d28]">
      <PublicBackground />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 lg:px-8 lg:py-8">
        <header className="flex items-center justify-between">
          <Link
            className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-medium text-[#2b1d28] shadow-[0_12px_40px_rgba(71,44,62,0.08)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
            href="/landing"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-[#ff8b72] text-sm font-semibold text-white shadow-[0_10px_20px_rgba(255,139,114,0.35)]">
              c
            </span>
            cutuu
          </Link>

          <Link
            className="inline-flex items-center gap-2 text-sm text-[#6a5564] transition-colors hover:text-[#2b1d28]"
            href="/landing"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </header>

        <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <section className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd9ce] bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#9e6075] shadow-[0_14px_34px_rgba(120,77,99,0.08)] backdrop-blur-xl">
              <Sparkles className="size-3.5" />
              {badge}
            </div>

            <h1 className="mt-6 max-w-lg font-[family:var(--font-fraunces)] text-5xl leading-none tracking-[-0.04em] text-[#2b1d28] md:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#6e5b67] md:text-lg">
              {description}
            </p>

            <div className="mt-8 grid gap-3">
              {trustNotes.map((note) => (
                <div
                  key={note.title}
                  className="public-panel group flex items-start gap-4 p-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff1e8] text-[#ff8b72] shadow-[0_12px_24px_rgba(255,139,114,0.14)]">
                    <note.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2b1d28]">
                      {note.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#6e5b67]">
                      {note.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="public-panel mt-8 flex items-center gap-4 p-4 md:p-5">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-[1.75rem] bg-white">
                <Image
                  alt="Cutuu mascot"
                  className="animate-float-soft object-contain p-2"
                  fill
                  sizes="64px"
                  src="/assets/mascot-peeking.png"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[#2b1d28]">
                  “I wanted something that felt gentle, not transactional.”
                </p>
                <p className="mt-1 text-sm text-[#806c78]">{helperText}</p>
              </div>
            </div>
          </section>

          <section className="public-panel relative mx-auto w-full max-w-[520px] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#2b1d28]">{title}</p>
                <p className="mt-1 text-sm text-[#7f6976]">{description}</p>
              </div>
              <span className="public-chip">soft start</span>
            </div>

            <div>{children}</div>

            <div className="mt-6 border-t border-[#f0dcd6] pt-5 text-sm text-[#7f6976]">
              <span>{switchText} </span>
              <Link
                className="font-semibold text-[#b65f73] transition-colors hover:text-[#8f4658]"
                href={switchHref}
              >
                {switchLabel}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
