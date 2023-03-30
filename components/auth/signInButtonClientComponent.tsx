"use client";

import { SignInButton } from "@clerk/nextjs";
import LoginSVG from "../svg/login";
import { usePathname } from "next/navigation";

export default function SignInButtonClientComponent() {
  const pathname = usePathname();
  return (
    <SignInButton mode="modal" afterSignInUrl={pathname} afterSignUpUrl="/">
      <button>
        <LoginSVG />
      </button>
    </SignInButton>
  );
}
