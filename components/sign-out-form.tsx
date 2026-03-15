"use client";

import { useStackApp } from "@stackframe/stack";

export const SignOutForm = () => {
  const stack = useStackApp();
  
  return (
    <button
      className="w-full px-1 py-0.5 text-left text-red-500"
      onClick={() => stack.signOut()}
      type="button"
    >
      Sign out
    </button>
  );
};
