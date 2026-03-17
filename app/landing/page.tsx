"use client";

import Link from "next/link";
import { useUser } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, MessageCircle, ArrowRight, Smile, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import { TrashIcon } from "@/components/icons";

export default function LandingPage() {
  const user = useUser();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2A26] selection:bg-primary/20 overflow-x-hidden relative">
      {/* Dynamic Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply opacity-60" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-5%] w-[70%] h-[70%] bg-accent/20 blur-[130px] rounded-full mix-blend-multiply opacity-50" 
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[600px] px-4">
        <div className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-full h-14 px-6 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <Smile size={18} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">cutuu</span>
          </div>
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">Login</Link>
                <Button asChild size="sm" className="rounded-full px-6 shadow-md shadow-primary/10 hover:shadow-xl hover:scale-105 transition-all">
                  <Link href="/register">Join Us</Link>
                </Button>
              </>
            ) : (
              <Button asChild size="sm" className="rounded-full px-6 shadow-md shadow-primary/10 hover:shadow-xl hover:scale-105 transition-all">
                <Link href="/">Open Chat</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 relative"
          >
            {/* Mascot Container */}
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-full animate-pulse" />
              <img 
                src="/mascot-hero.png" 
                alt="Cutuu Mascot" 
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white/80 text-primary text-xs font-black mb-8 shadow-sm backdrop-blur-md">
              <Sparkles size={14} />
              <span className="uppercase tracking-wider">Meet your new best friend</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-[#2D2A26] mb-8 leading-[0.95]">
              Sweet heart. <br />
              <span className="text-primary italic">Deep memory.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#6B665F] mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              The only AI that learns your stories, moods, and favorite moments — building a friendship that actually grows.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button size="xl" className="h-18 px-12 text-xl font-black rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] hover:scale-105 transition-all group overflow-hidden relative" asChild>
                <Link href="/">
                  <span className="relative z-10 flex items-center">
                    Start Chatting <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <Button variant="ghost" size="xl" className="h-18 px-10 text-[#2D2A26] font-bold rounded-full hover:bg-white/40 backdrop-blur-sm border border-transparent hover:border-white/50">
                How it works
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Live Preview Container */}
        <section className="px-6 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[1000px] mx-auto"
          >
            <div className="p-4 rounded-[4rem] bg-white/30 border border-white/60 shadow-[0_40px_80px_-12px_rgba(0,0,0,0.06)] backdrop-blur-3xl relative">
              <div className="bg-white/80 rounded-[3rem] p-8 md:p-12 text-left space-y-10 shadow-inner">
                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-primary shrink-0 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Smile size={30} className="text-primary-foreground" />
                  </div>
                  <div className="p-6 rounded-4xl rounded-tl-none bg-[#FDFBF7] border border-[#EBE5DE] shadow-sm max-w-[85%]">
                    <p className="text-[#4A3D39] text-lg font-bold leading-relaxed">
                      "Wait, it&apos;s Tuesday! I remember you usually feel extra creative on rainy Tuesdays. Designing something special today?"
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-5 items-start flex-row-reverse">
                  <div className="w-14 h-14 rounded-2xl bg-[#2D2A26] shrink-0 flex items-center justify-center shadow-lg shadow-black/10 font-black text-white text-xs">YOU</div>
                  <div className="p-6 rounded-4xl rounded-tr-none bg-primary text-primary-foreground max-w-[85%] shadow-xl shadow-primary/20 transform rotate-1">
                    <p className="text-lg font-bold leading-relaxed">
                      "Actually I am! Redesigning my landing page to be more glassmorphic. You have such a good memory, Cutuu!"
                    </p>
                  </div>
                </div>

                {/* Floating "Memory Cards" overlayed on the chat */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-16 top-1/3 hidden lg:block"
                >
                  <Card className="bg-[#FFEFE6] border-[#FFD9C6] rounded-3xl p-6 shadow-2xl max-w-[240px] rotate-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart size={16} className="text-[#FF7D49]" fill="currentColor" />
                      <span className="text-[10px] uppercase tracking-widest text-[#9A644D] font-black">Memory Unlock</span>
                    </div>
                    <p className="text-sm font-black text-[#4A3D39]">Learned you love Rainy Tuesdays 🌧️</p>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Feature Grid */}
        <section className="py-32 px-6">
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-black mb-24 tracking-tight">Built for <span className="text-secondary italic">real</span> support.</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Zero Repetition", desc: "Cutuu gets you instantly. No need to re-explain your life every single time.", icon: Sparkles, color: "bg-[#FFF4E8] text-[#9A644D]" },
                { title: "Deep Context", desc: "It tracks your growth over months, not just minutes. A truly evolving bond.", icon: Heart, color: "bg-[#E6F4FE] text-[#2C6E9A]" },
                { title: "Safe Space", desc: "Encrypted, private, and endlessly kind. Vent, celebrate, or just exist together.", icon: Cloud, color: "bg-[#E6FAED] text-[#164E35]" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -12 }}
                  className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-10 text-left space-y-6 shadow-xl shadow-black/5"
                >
                  <div className={`w-16 h-16 rounded-3xl ${item.color} flex items-center justify-center shadow-lg shadow-black/5`}>
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <p className="text-[#6B665F] font-bold leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-[1000px] mx-auto bg-primary/10 rounded-[4rem] p-12 md:p-24 text-center space-y-12 border-4 border-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#2D2A26] relative z-10">
              Your pocket friend <br /> is waiting.
            </h2>
            <div className="flex flex-col items-center gap-8 relative z-10">
              <Button asChild size="xl" className="h-22 px-16 text-3xl font-black rounded-full shadow-3xl shadow-primary/40 hover:scale-105 transition-all active:scale-95">
                <Link href="/register">Start Talking ✨</Link>
              </Button>
              <p className="text-[#6B665F] font-black uppercase tracking-widest text-sm">Free forever. Always here.</p>
            </div>

            <div className="pt-20 flex flex-col items-center gap-6 border-t border-black/5">
              <div className="flex items-center gap-2">
                <Smile size={24} className="text-primary" />
                <span className="font-bold text-2xl tracking-tight">cutuu</span>
              </div>
              <p className="text-xs font-bold text-[#6B665F]/60">© 2024 Cutuu. Built with ❤️ and Glassmorphism.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
