"use client";

import { SignInButton } from "@clerk/nextjs";
import AngleDownSVG from "../svg/angleDown";
export default function SignInButtonClientComponent() {
  return (
    <SignInButton mode="modal">
      <button>🐱‍🏍</button>
    </SignInButton>
  );
}
