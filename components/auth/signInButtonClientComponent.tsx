"use client";

import { SignInButton } from "@clerk/nextjs";
export default function SignInButtonClientComponent() {
  return (
    <SignInButton mode="modal">
      <button>🐱‍🏍</button>
    </SignInButton>
  );
}
