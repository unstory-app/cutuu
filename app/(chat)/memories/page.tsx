"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Brain, History, User } from "lucide-react";
import { SidebarToggle } from "@/components/sidebar-toggle";

interface Memory {
  id: string;
  content: string;
  createdAt: string;
}

export default function MemoryTimelinePage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMemories() {
      try {
        const response = await fetch("/api/memories");
        const data = await response.json();
        setMemories(data);
      } catch (error) {
        console.error("Failed to fetch memories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMemories();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="sticky top-0 flex items-center gap-2 bg-background px-4 py-3 border-b">
        <SidebarToggle />
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-semibold">Memory Timeline</h1>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : memories.length === 0 ? (
            <div className="text-center py-20 opacity-60">
              <History className="w-12 h-12 mx-auto mb-4" />
              <p>No memories stored yet. Keep chatting to build your profile.</p>
            </div>
          ) : (
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
              {memories.map((memory, index) => (
                <div key={memory.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-foreground">Memory #{memories.length - index}</div>
                      <time className="text-xs font-medium text-muted-foreground">{format(new Date(memory.createdAt), "MMM d, yyyy")}</time>
                    </div>
                    <div className="text-muted-foreground">{memory.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
