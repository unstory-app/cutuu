import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignIn } from "@stackframe/stack";
import { AuthShell } from "@/components/marketing/auth-shell";
import { stackServerApp } from "@/stack/server";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Cutuu account and return to your ongoing conversations.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function Page() {
  let user: Awaited<ReturnType<typeof stackServerApp.getUser>> | null = null;

  try {
    user = await stackServerApp.getUser();
  } catch (error) {
    console.warn("Failed to read session on login page", error);
  }

  if (user) {
    redirect("/");
  }

  return (
    <AuthShell
      badge="welcome back"
      description="Pick up where you left off with the same calm little space and the same familiar context."
      helperText="Good sign-in pages should feel reassuring, not transactional."
      switchHref="/register"
      switchLabel="Create an account"
      switchText="New here?"
      title="Your soft corner is still here."
    >
      <SignIn fullPage={false} />
    </AuthShell>
  );
}
