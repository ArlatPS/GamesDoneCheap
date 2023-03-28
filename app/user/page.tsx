import {
  currentUser,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs/app-beta";

export default async function UserPage() {
  const user = await currentUser();

  return (
    <SignedIn>
      <h2>{user?.id}</h2>
      <UserButton />
    </SignedIn>
  );
}
