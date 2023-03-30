"use client";

import { SignIn } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function SignInSection() {
  const pathname = usePathname();
  return (
    <section className="signedOutSection">
      <SignIn afterSignInUrl={pathname} afterSignUpUrl="/" />
    </section>
  );
}
