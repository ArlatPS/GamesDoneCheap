import { SignIn } from "@clerk/nextjs/app-beta";

export default function SignInComponent() {
  return <SignIn signUpUrl="/sign-up" />;
}
