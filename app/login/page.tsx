import { SignIn } from "@stackframe/stack";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[450px] glass p-8 rounded-[2.5rem] shadow-float animate-in fade-in zoom-in duration-500">
        <SignIn fullPage={false} />
      </div>
    </div>
  );
}
