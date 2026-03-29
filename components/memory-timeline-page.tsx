import { format } from "date-fns";
import { Brain, History, User } from "lucide-react";
import { SidebarToggle } from "@/components/sidebar-toggle";

type MemoryTimelineEntry = {
  id: string;
  content: string;
  createdAt: string;
  categories?: string[];
};

export function MemoryTimelinePage({
  memories,
}: {
  memories: MemoryTimelineEntry[];
}) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="sticky top-0 flex items-center gap-2 border-b bg-background px-4 py-3">
        <SidebarToggle />
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold">Memory Timeline</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-2xl">
          {memories.length === 0 ? (
            <div className="py-20 text-center opacity-60">
              <History className="mx-auto mb-4 h-12 w-12" />
              <p>No memories stored yet. Keep chatting to build your profile.</p>
            </div>
          ) : (
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent md:before:mx-auto md:before:translate-x-0">
              {memories.map((memory, index) => (
                <div
                  key={memory.id}
                  className="group relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
                >
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="w-[calc(100%-4rem)] rounded-xl border border-border bg-card p-4 shadow-sm md:w-[calc(50%-2.5rem)]">
                    <div className="mb-1 flex items-center justify-between space-x-2">
                      <div className="font-bold text-foreground">
                        Memory #{memories.length - index}
                      </div>
                      <time className="text-xs font-medium text-muted-foreground">
                        {format(new Date(memory.createdAt), "MMM d, yyyy")}
                      </time>
                    </div>
                    <div className="text-muted-foreground">{memory.content}</div>
                    {memory.categories && memory.categories.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {memory.categories.map((category) => (
                          <span
                            key={`${memory.id}-${category}`}
                            className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    ) : null}
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
