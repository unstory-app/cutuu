import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Heart, Book, Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export default async function LandingPage() {
  const user = await stackServerApp.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#0F1115] text-white selection:bg-[#6C63FF]/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0F1115]/80 backdrop-blur-md">
        <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#6C63FF] flex items-center justify-center shadow-[0_0_15px_rgba(108,99,255,0.4)]">
              <Brain size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">cutuu</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Login</Link>
            <Button asChild className="bg-[#6C63FF] hover:bg-[#5a52e6] text-white border-none shadow-[0_0_20px_rgba(108,99,255,0.2)]">
              <Link href="/register">Start Talking</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-[90vh] flex flex-col items-center text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6C63FF]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[800px] relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] text-xs font-medium mb-8">
            <Sparkles size={14} />
            <span>Memory-First Daily Companion</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            The AI that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#A855F7]">remembers</span> your life.
          </h1>
          <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-[600px] mx-auto">
            A personal AI companion that remembers your thoughts, moods, goals, and stories — so every conversation feels real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="h-14 px-8 bg-[#6C63FF] hover:bg-[#5a52e6] text-white text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(108,99,255,0.3)] group">
              <Link href="/register">
                Start Talking <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="h-14 px-8 text-white/80 hover:text-white hover:bg-white/5 rounded-xl">
              See how memory works
            </Button>
          </div>
        </div>

        {/* Hero Illustration / Preview */}
        <div className="mt-20 w-full max-w-[1000px] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent z-20 pointer-events-none" />
          <div className="p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl relative z-10">
            <div className="bg-[#181A20] rounded-xl p-8 text-left space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#6C63FF] flex-shrink-0 flex items-center justify-center text-xs font-bold">C</div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 max-w-[80%]">
                  <p className="text-white/90">Last week you said exams were stressing you — how are you feeling now?</p>
                </div>
              </div>
              <div className="flex gap-4 items-start flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-[#22C55E] flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-[0_0_10px_rgba(34,197,94,0.4)]">U</div>
                <div className="p-4 rounded-2xl rounded-tr-none bg-[#6C63FF] max-w-[80%] shadow-lg">
                  <p className="text-white">Better actually! I passed that presentation we practiced. Thanks for checking in.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#6C63FF] flex-shrink-0 flex items-center justify-center text-xs font-bold">C</div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 max-w-[80%]">
                  <p className="text-white/90">That&apos;s amazing! I knew you&apos;d crush it. Should we celebrate today or keep focusing on the next one?</p>
                </div>
              </div>
            </div>
            {/* Floating Memory Cards */}
            <div className="absolute -right-8 top-1/4 animate-float hidden md:block">
              <Card className="bg-[#181A20]/80 border-white/10 p-4 backdrop-blur-md shadow-xl max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={14} className="text-[#6C63FF]" />
                  <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Memory Captured</span>
                </div>
                <p className="text-sm text-white/80">Stressed about presentation</p>
                <p className="text-xs text-white/30 mt-1">March 12, 2024</p>
              </Card>
            </div>
            <div className="absolute -left-12 bottom-1/4 animate-float-delayed hidden md:block">
              <Card className="bg-[#181A20]/80 border-white/10 p-4 backdrop-blur-md shadow-xl max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-[#22C55E]" />
                  <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Growth Insight</span>
                </div>
                <p className="text-sm text-white/80">Confident when prepared</p>
                <p className="text-xs text-white/30 mt-1">New Pattern Identified</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">Conversations shouldn&apos;t feel disposable.</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "No repetition", desc: "Stop explaining your context over and over again." },
              { title: "Emotional continuity", desc: "It remembers how you felt yesterday." },
              { title: "Personal growth", desc: "Reflect on your life through past memories." },
              { title: "Lives with you", desc: "An evolving bond that grows as you talk." }
            ].map((item, i) => (
              <div key={i} className="text-left space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#6C63FF]">
                  <ArrowRight size={20} />
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-[#181A20]/30 border-y border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] text-xs font-bold">CORE FEATURES</div>
                <h2 className="text-4xl font-bold tracking-tight leading-tight">Built for relationships, not just intelligence.</h2>
              </div>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/20 flex-shrink-0 flex items-center justify-center text-[#6C63FF]">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Long-Term Memory</h3>
                    <p className="text-white/50 leading-relaxed">Remembers what matters — from life goals to small daily moments that other AIs forget instantly.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 flex-shrink-0 flex items-center justify-center text-[#22C55E]">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Natural Daily Conversations</h3>
                    <p className="text-white/50 leading-relaxed">Talk like you would to a friend. No complex prompts. No structured rules. Just natural talk.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#6C63FF]/10 blur-[80px] rounded-full" />
              <div className="relative bg-[#181A20] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`h-32 rounded-2xl bg-white/${(i + 1) * 2} border border-white/5 flex flex-col p-4 animate-pulse`} style={{ animationDelay: `${i * 200}ms` }}>
                      <div className="w-full h-2 bg-white/10 rounded mb-2" />
                      <div className="w-2/3 h-2 bg-white/5 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-20 tracking-tight">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
             <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-px bg-white/5" />
             {[
               { step: "1", title: "Talk freely", desc: "Just start a conversation about your day or thoughts." },
               { step: "2", title: "AI remembers", desc: "It identifies patterns and extracts important memories." },
               { step: "3", title: "Bond evolves", desc: "Conversations become deeper and more personal." }
             ].map((item, i) => (
               <div key={i} className="relative space-y-6">
                 <div className="w-20 h-20 rounded-full bg-[#0F1115] border-2 border-[#6C63FF] mx-auto flex items-center justify-center text-2xl font-bold relative z-10 shadow-[0_0_20px_rgba(108,99,255,0.4)]">
                   {item.step}
                 </div>
                 <h3 className="text-xl font-bold">{item.title}</h3>
                 <p className="text-white/50 max-w-[250px] mx-auto">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="max-w-[1100px] mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Build a relationship with your AI.</h2>
            <p className="text-white/40">Ready to meet your daily companion?</p>
          </div>
          <Button asChild size="lg" className="h-16 px-10 bg-[#6C63FF] hover:bg-[#5a52e6] text-white text-xl font-bold rounded-2xl shadow-[0_0_40px_rgba(108,99,255,0.4)] group">
            <Link href="/register">
              Start your first conversation <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <div className="pt-20 flex flex-col items-center gap-6 opacity-40">
            <div className="flex items-center gap-2">
              <Brain size={20} />
              <span className="font-bold text-lg tracking-tight">cutuu</span>
            </div>
            <p className="text-xs">© 2024 Cutuu. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
