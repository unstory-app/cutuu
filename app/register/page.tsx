import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignUp } from "@stackframe/stack";
import { AuthShell } from "@/components/marketing/auth-shell";
import { stackServerApp } from "@/stack/server";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Create a Cutuu account and start a memory-first conversation space that grows with you.",
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
    console.warn("Failed to read session on register page", error);
  }

  if (user) {
    redirect("/");
  }

  return (
    <AuthShell
      badge="start gently"
      description="Create your account, start one honest little conversation, and let the relationship build from there."
      helperText="A first hello should feel easy, warm, and a little bit hopeful."
      switchHref="/login"
      switchLabel="Log in instead"
      switchText="Already have an account?"
      title="Make a space that remembers you."
    >
      <SignUp fullPage={false} />
    </AuthShell>
  );
}
