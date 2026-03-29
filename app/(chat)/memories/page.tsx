import { redirect } from "next/navigation";
import { MemoryTimelinePage } from "@/components/memory-timeline-page";
import { getUserMemories } from "@/lib/memory/mem0";
import { stackServerApp } from "@/stack/server";

export default async function Page() {
  let user: Awaited<ReturnType<typeof stackServerApp.getUser>> | null = null;

  try {
    user = await stackServerApp.getUser();
  } catch (error) {
    console.warn("Failed to read session on memories page", error);
  }

  if (!user) {
    redirect("/landing");
  }

  const memories = await getUserMemories({
    userId: user.id,
    limit: 100,
  }).catch((error) => {
    console.error("Failed to load memories page", error);
    return [];
  });

  return (
    <MemoryTimelinePage
      memories={memories.map((memory) => ({
        id: memory.id,
        content: memory.memory,
        createdAt: memory.updated_at || memory.created_at,
        categories: memory.categories ?? [],
      }))}
    />
  );
}
