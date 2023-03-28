"use client";

import { SignInButton } from "@clerk/nextjs";
import LoginSVG from "../svg/login";

export default function SignInButtonClientComponent() {
  return (
    <SignInButton mode="modal">
      <button>
        <LoginSVG />
      </button>
    </SignInButton>
  );
}
