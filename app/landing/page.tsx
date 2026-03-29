import type { Metadata } from "next";
import { LandingPage } from "@/components/marketing/landing-page";
import { stackServerApp } from "@/stack/server";

export const metadata: Metadata = {
  title: "Cutuu | A memory-first AI companion",
  description:
    "Cutuu is a gentle AI companion for daily check-ins, journaling, and familiar conversations that remember your world.",
  alternates: {
    canonical: "/landing",
  },
  openGraph: {
    title: "Cutuu | A memory-first AI companion",
    description:
      "A soft, clean place for daily conversations that remembers your name, your routines, and the little things that matter.",
    url: "/landing",
    images: [
      {
        url: "/images/demo-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Cutuu preview",
      },
    ],
  },
};

export default async function Page() {
  let user: Awaited<ReturnType<typeof stackServerApp.getUser>> | null = null;

  try {
    user = await stackServerApp.getUser();
  } catch (error) {
    console.warn("Failed to read session on landing page", error);
  }

  return <LandingPage isSignedIn={Boolean(user)} />;
}
