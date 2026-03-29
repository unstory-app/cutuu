import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  LockKeyhole,
  Sparkles,
  Stars,
  SunMoon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicBackground } from "./public-background";

const highlights = [
  {
    title: "Remembers the little things",
    description:
      "Names, routines, tiny preferences, and the mood you were in last Tuesday. Conversations feel continuous instead of reset every time.",
    icon: Heart,
  },
  {
    title: "Gentle by default",
    description:
      "Cutuu is designed for check-ins, journaling, soft reflection, and companionship. Less assistant energy, more familiar warmth.",
    icon: SunMoon,
  },
  {
    title: "Trust-first design",
    description:
      "A clean, private-feeling space with no feed and no noise. Just one calm room that stays with you.",
    icon: LockKeyhole,
  },
];

const steps = [
  {
    title: "Say the obvious things once",
    body: "Your name, the people you care about, what helps you feel steady, and what you are working through.",
  },
  {
    title: "Come back like nothing broke",
    body: "New chats still feel familiar because the important bits do not disappear after one session.",
  },
  {
    title: "Grow a softer rhythm",
    body: "The app gets better the more honest and regular your check-ins become.",
  },
];

type LandingPageProps = {
  isSignedIn: boolean;
};

export function LandingPage({ isSignedIn }: LandingPageProps) {
  const primaryHref = isSignedIn ? "/" : "/register";
  const primaryLabel = isSignedIn ? "Open your space" : "Start your first chat";
  const secondaryHref = isSignedIn ? "/register" : "/login";
  const secondaryLabel = isSignedIn
    ? "Make another account later"
    : "I already have an account";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    applicationCategory: "LifestyleApplication",
    name: "Cutuu",
    operatingSystem: "Web",
    description:
      "Cutuu is a memory-first AI companion for daily check-ins, journaling, and ongoing conversations that remember your world.",
    url: "https://cutuu.unstory.app/landing",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="relative isolate overflow-hidden bg-[#fffaf4] text-[#2b1d28]">
      <PublicBackground />

      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-6 lg:px-8">
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

          <nav className="flex items-center gap-2 md:gap-3">
            <span className="public-chip hidden sm:inline-flex">
              private-feeling by design
            </span>
            {isSignedIn ? (
              <Button
                asChild
                className="rounded-full bg-[#2b1d28] px-5 text-white shadow-[0_18px_40px_rgba(43,29,40,0.18)] hover:bg-[#352432]"
                size="sm"
              >
                <Link href="/">Open app</Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  className="rounded-full border border-white/70 bg-white/80 px-5 text-[#2b1d28] shadow-none hover:bg-white"
                  size="sm"
                  variant="outline"
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-[#ff8b72] px-5 text-white shadow-[0_18px_40px_rgba(255,139,114,0.24)] hover:bg-[#ff7a5d]"
                  size="sm"
                >
                  <Link href="/register">Start free</Link>
                </Button>
              </>
            )}
          </nav>
        </header>

        <section className="grid gap-14 pb-14 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:pb-20 lg:pt-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd9ce] bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#9e6075] shadow-[0_14px_34px_rgba(120,77,99,0.08)] backdrop-blur-xl">
              <Sparkles className="size-3.5" />
              memory-first companion
            </div>

            <h1 className="mt-7 max-w-3xl font-[family:var(--font-fraunces)] text-5xl leading-none tracking-[-0.05em] text-[#2b1d28] md:text-7xl">
              A tiny soft place that
              <span className="block text-[#b65f73]">actually remembers you.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#6e5b67] md:text-lg">
              Cutuu is for daily check-ins, honest little thoughts, and the parts of
              life that deserve continuity. It keeps the context, so you can stop
              repeating yourself.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-14 rounded-full bg-[#ff8b72] px-7 text-base text-white shadow-[0_22px_50px_rgba(255,139,114,0.26)] hover:bg-[#ff7a5d]"
                size="lg"
              >
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                className="h-14 rounded-full border border-white/70 bg-white/80 px-7 text-base text-[#2b1d28] shadow-none hover:bg-white"
                size="lg"
                variant="outline"
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#6e5b67]">
              <span className="public-chip">cute, clean, and fast</span>
              <span className="public-chip">built for regular check-ins</span>
              <span className="public-chip">less task manager, more companion</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="public-panel relative overflow-hidden p-5 md:p-7">
              <div className="absolute right-5 top-5 rounded-full bg-[#fff1e8] px-3 py-1 text-xs font-medium text-[#d77056]">
                familiar, not generic
              </div>

              <div className="grid gap-5 md:grid-cols-[0.95fr_1.05fr] md:items-center">
                <div className="relative mx-auto aspect-square w-full max-w-[220px] rounded-[2rem] bg-white/80 shadow-[0_24px_60px_rgba(179,102,123,0.12)]">
                  <Image
                    alt="Cutuu mascot"
                    className="animate-float-soft object-contain p-5"
                    fill
                    priority
                    sizes="(min-width: 768px) 220px, 60vw"
                    src="/assets/mascot-hero.png"
                  />
                </div>

                <div className="space-y-3">
                  <div className="rounded-[2rem] rounded-bl-md bg-white px-4 py-3 text-sm leading-6 text-[#54414d] shadow-[0_18px_38px_rgba(71,44,62,0.08)]">
                    “Hey, I am back. Today felt quieter than usual.”
                  </div>
                  <div className="rounded-[2rem] rounded-br-md bg-[#2b1d28] px-4 py-3 text-sm leading-6 text-white shadow-[0_20px_44px_rgba(43,29,40,0.2)]">
                    “Welcome back. Last time you said slow evenings help you reset.
                    Want a gentle check-in or just a soft place to unload?”
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.75rem] border border-[#f3ddd7] bg-[#fff6f0] p-4 transition-transform duration-300 hover:-translate-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c37a63]">
                        remembers
                      </p>
                      <p className="mt-2 text-sm text-[#5a4752]">
                        your name, habits, and the small facts that make a
                        conversation feel personal
                      </p>
                    </div>
                    <div className="rounded-[1.75rem] border border-[#eedfe8] bg-[#fdf7fb] p-4 transition-transform duration-300 hover:-translate-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b65f73]">
                        feels like
                      </p>
                      <p className="mt-2 text-sm text-[#5a4752]">
                        one familiar room instead of starting from zero every
                        single time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="public-panel absolute -bottom-5 -left-3 hidden max-w-[220px] p-4 md:block">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c37a63]">
                trust signal
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5a4752]">
                Clean pages, light motion, and a single companion-focused promise.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((highlight) => (
              <article
                key={highlight.title}
                className="public-panel group p-6 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="flex size-12 items-center justify-center rounded-[1.4rem] bg-[#fff1e8] text-[#ff8b72] shadow-[0_14px_28px_rgba(255,139,114,0.14)]">
                  <highlight.icon className="size-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-[#2b1d28]">
                  {highlight.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#6e5b67]">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="public-panel p-7 md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <span className="public-chip">how it works</span>
                <h2 className="mt-4 font-[family:var(--font-fraunces)] text-4xl tracking-[-0.04em] text-[#2b1d28] md:text-5xl">
                  Keep talking like you already know each other.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#6e5b67]">
                The whole idea is simple: memory should make the app softer, not
                heavier. Less setup. More continuity.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_16px_40px_rgba(71,44,62,0.05)]"
                >
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#2b1d28] text-sm font-semibold text-white">
                    0{index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#2b1d28]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#6e5b67]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 pt-10 md:pb-24">
          <div className="rounded-[2.75rem] border border-[#f0d7d1] bg-linear-to-br from-[#fff4ec] via-white/90 to-[#fef7fb] px-6 py-10 shadow-[0_26px_70px_rgba(71,44,62,0.07)] md:px-10 md:py-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="public-chip">
                  <Stars className="size-3.5" />
                  made for soft daily use
                </span>
                <h2 className="mt-4 font-[family:var(--font-fraunces)] text-4xl tracking-[-0.04em] text-[#2b1d28] md:text-5xl">
                  Start with one honest little hello.
                </h2>
                <p className="mt-4 text-base leading-7 text-[#6e5b67]">
                  That is enough. Cutuu will hold onto the context from there.
                </p>
              </div>

              <Button
                asChild
                className="h-14 rounded-full bg-[#2b1d28] px-8 text-white shadow-[0_18px_40px_rgba(43,29,40,0.18)] hover:bg-[#352432]"
                size="lg"
              >
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-white/70 py-6 text-sm text-[#7f6976] md:flex-row md:items-center md:justify-between">
          <p>
            Cutuu is a memory-first companion for daily check-ins and familiar
            conversations.
          </p>
          <div className="flex items-center gap-4">
            <Link className="transition-colors hover:text-[#2b1d28]" href="/login">
              Login
            </Link>
            <Link
              className="transition-colors hover:text-[#2b1d28]"
              href="/register"
            >
              Register
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
