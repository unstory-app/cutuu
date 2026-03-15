import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(120,80,255,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,120,170,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-16">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            cutuu
          </span>
          <span className="hidden text-xs text-white/30 md:block">
            your daily companion
          </span>
        </div>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            Get started →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center px-6 pt-20 pb-16 text-center md:pt-32">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
          Memory-first AI companion
        </div>

        <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
          An AI that{" "}
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
            remembers you.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/50 md:text-lg leading-relaxed">
          Cutuu is a personal daily companion that listens, remembers, and grows
          with you — like a thoughtful friend who never forgets a word you've
          said.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-8 py-3 text-base font-semibold text-white shadow-2xl shadow-violet-900/40 transition hover:scale-105 hover:opacity-95"
          >
            Start your journal →
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/15 px-8 py-3 text-base font-medium text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 md:pb-36">
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            emoji="🧠"
            title="Long-term memory"
            description="Cutuu remembers what you tell it — your preferences, your mood patterns, your milestones — across every session."
          />
          <FeatureCard
            emoji="💬"
            title="Warm conversation"
            description="Talk like you would with a friend. No jargon, no bullet points — just natural, reflective dialogue."
          />
          <FeatureCard
            emoji="📓"
            title="Daily reflection"
            description="Capture your day, process your thoughts, and get a weekly summary of your emotional patterns."
          />
        </div>

        {/* Memory timeline preview */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <p className="mb-5 text-xs font-medium uppercase tracking-widest text-white/30">
            Memory Timeline preview
          </p>
          <div className="space-y-4">
            {[
              {
                date: "Mar 15",
                text: "You feel most at peace when it's raining and you're near a piano.",
              },
              {
                date: "Mar 12",
                text: "You mentioned struggling with the transition to a new city.",
              },
              {
                date: "Mar 8",
                text: "You love morning tea rituals — it grounding to your routine.",
              },
            ].map((memory) => (
              <div
                key={memory.date}
                className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/5 px-4 py-3"
              >
                <span className="mt-0.5 shrink-0 text-xs text-white/30">
                  {memory.date}
                </span>
                <span className="text-sm text-white/70">{memory.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 border-t border-white/5 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Begin your story today.
        </h2>
        <p className="mt-3 text-white/40">No setup. No data exports. Just talk.</p>
        <Link
          href="/register"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-10 py-3.5 text-base font-semibold text-white shadow-xl shadow-violet-900/30 transition hover:scale-105 hover:opacity-95"
        >
          Create free account
        </Link>
      </section>

      <footer className="relative z-10 px-6 py-6 text-center text-xs text-white/20">
        © {new Date().getFullYear()} Cutuu. Made with care.
      </footer>
    </main>
  );
}

function FeatureCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/8">
      <div className="mb-3 text-3xl">{emoji}</div>
      <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/50">{description}</p>
    </div>
  );
}
