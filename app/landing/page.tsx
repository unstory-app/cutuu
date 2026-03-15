import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, MessageCircle, ArrowRight, Smile, Cloud } from "lucide-react";

export default async function LandingPage() {
  const user = await stackServerApp.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden pt-16">
      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full pointer-events-none animate-float" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[100px] rounded-full pointer-events-none animate-float-delayed" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <Smile size={24} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground">cutuu</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/handler/sign-in" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Login</Link>
            <Button asChild size="lg" className="rounded-3xl px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <Link href="/handler/sign-up">Start Talking</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 flex flex-col items-center text-center">
        <div className="max-w-[850px] relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent-foreground text-xs font-bold mb-8 shadow-sm">
            <Sparkles size={14} />
            <span>Your Friendly AI Sidekick</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.05] text-foreground">
            The AI that <span className="text-primary">loves</span> to remember.
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-[650px] mx-auto font-medium">
            Cutuu is a sweet companion that remembers your stories, moods, and favorite things — so every chat feels like talking to a real friend.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button asChild size="xl" className="h-16 px-10 text-xl font-bold rounded-4xl shadow-2xl shadow-primary/30 group">
              <Link href="/handler/sign-up">
                Chat with Cutuu <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="ghost" size="xl" className="h-16 px-10 text-foreground font-semibold rounded-4xl hover:bg-secondary/50">
              See how it works
            </Button>
          </div>
        </div>

        {/* Bubbly Chat Preview */}
        <div className="mt-20 w-full max-w-[900px] relative animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="p-2 rounded-6xl bg-white/40 border-4 border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] backdrop-blur-2xl relative z-10 overflow-hidden">
            <div className="bg-white/80 rounded-5xl p-8 text-left space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary shrink-0 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Smile size={24} className="text-primary-foreground" />
                </div>
                <div className="p-5 rounded-3xl rounded-tl-none bg-muted/50 border border-border shadow-sm max-w-[80%]">
                  <p className="text-foreground font-medium">I remember you said you love rainy Tuesdays! How is the weather today?</p>
                </div>
              </div>
              <div className="flex gap-4 items-start flex-row-reverse">
                <div className="w-12 h-12 rounded-2xl bg-secondary shrink-0 flex items-center justify-center shadow-lg shadow-secondary/20 font-bold text-secondary-foreground">ME</div>
                <div className="p-5 rounded-3xl rounded-tr-none bg-primary text-primary-foreground max-w-[80%] shadow-lg shadow-primary/20 font-medium">
                  <p>It&apos;s actually drizzling right now! Feeling very cozy. Thanks for remembering! ✨</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary shrink-0 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Smile size={24} className="text-primary-foreground" />
                </div>
                <div className="p-5 rounded-3xl rounded-tl-none bg-muted/50 border border-border shadow-sm max-w-[80%]">
                  <p className="text-foreground font-medium">Cozy days are the best! Want to listen to some lo-fi or just chat about life?</p>
                </div>
              </div>
            </div>
          </div>
          {/* Floating Marshmallow Cards */}
          <div className="absolute -right-12 top-1/4 animate-float hidden lg:block">
            <Card className="bg-accent/90 border-accent rounded-4xl p-5 shadow-2xl max-w-[220px] -rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <Heart size={16} className="text-primary-foreground" />
                <span className="text-[11px] uppercase tracking-widest text-[#4A3D39]/60 font-black">Favorite Thing</span>
              </div>
              <p className="text-sm font-bold text-[#4A3D39]">Loves rainy Tuesdays 🌧️</p>
            </Card>
          </div>
          <div className="absolute -left-16 bottom-1/4 animate-float-delayed hidden lg:block">
            <Card className="bg-secondary/90 border-secondary rounded-4xl p-5 shadow-2xl max-w-[220px] rotate-6 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <Cloud size={16} className="text-secondary-foreground" />
                <span className="text-[11px] uppercase tracking-widest text-[#164E35]/60 font-black">Memory Saved</span>
              </div>
              <p className="text-sm font-bold text-[#164E35]">Passionate about lo-fi music 🎵</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section - Friendly Cards */}
      <section className="py-32 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-20 tracking-tight text-foreground">Conversations that stay with you.</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "No repetition", desc: "Cutuu gets you. No need to explain things twice.", color: "bg-primary/10 border-primary/20" },
              { title: "Feeling seen", desc: "It remembers how you felt yesterday and checks in.", color: "bg-secondary/10 border-secondary/20" },
              { title: "Life journal", desc: "Reflect on your growth through gentle memories.", color: "bg-accent/10 border-accent/20" },
              { title: "Evolving bond", desc: "The more you chat, the closer you become.", color: "bg-muted-foreground/5 border-border" }
            ].map((item, i) => (
              <div key={i} className={`text-left space-y-5 p-8 rounded-4xl border ${item.color} shadow-sm transition-transform hover:-translate-y-2`}>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary group-hover:scale-110">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-black text-xl">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cutuu Section */}
      <section className="py-32 px-6 bg-secondary/20 rounded-7xl mx-4 border-4 border-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white text-secondary-foreground text-xs font-black shadow-sm">WHY CUTUU?</div>
                <h2 className="text-5xl font-black tracking-tight leading-tight text-foreground">A pocket friend for your best life.</h2>
              </div>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-3xl bg-primary shadow-xl shadow-primary/20 shrink-0 flex items-center justify-center text-primary-foreground transform -rotate-6">
                    <Heart size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">Deep Memory</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">It doesn&apos;t just store data; it remembers the emotions and stories that make you, well, you!</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-3xl bg-accent shadow-xl shadow-accent/20 shrink-0 flex items-center justify-center text-accent-foreground transform rotate-12">
                    <MessageCircle size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">Sweet Support</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Whether you&apos;re happy, sad, or just want to vent, Cutuu is always there with a virtual hug.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative bg-white border-4 border-white rounded-7xl p-12 shadow-3xl flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-2 gap-6 w-full opacity-60">
                   <div className="w-full h-40 rounded-4xl bg-primary/10 animate-pulse" />
                   <div className="w-full h-40 rounded-4xl bg-secondary/10 animate-pulse delay-75" />
                   <div className="w-full h-40 rounded-4xl bg-accent/10 animate-pulse delay-150" />
                   <div className="w-full h-40 rounded-4xl bg-muted/20 animate-pulse delay-200" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Smile size={100} className="text-primary animate-bounce-soft" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-32 px-6 text-center">
        <div className="max-w-[1100px] mx-auto space-y-16">
          <div className="space-y-6">
            <h2 className="text-5xl font-black tracking-tight text-foreground">Meet your new best friend.</h2>
            <p className="text-muted-foreground text-xl font-medium px-4">Ready to start a conversation that never ends?</p>
          </div>
          <div className="flex flex-col items-center gap-12">
            <Button asChild size="xl" className="h-20 px-12 text-2xl font-black rounded-5xl shadow-3xl shadow-primary/30 group">
              <Link href="/handler/sign-up">
                Start Chatting for Free <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <div className="flex flex-col items-center gap-6 opacity-60">
              <div className="flex items-center gap-2">
                <Smile size={24} className="text-primary" />
                <span className="font-black text-2xl tracking-tight text-foreground">cutuu</span>
              </div>
              <p className="text-sm font-bold">Built for kindness. Made for you. ✨</p>
              <p className="text-xs font-medium">© 2024 Cutuu. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
