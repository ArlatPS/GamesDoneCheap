import {
  currentUser,
  SignedIn,
  SignedOut,
  UserProfile,
  SignIn,
} from "@clerk/nextjs/app-beta";

export default async function UserPage() {
  const user = await currentUser();

  return (
    <section>
      <SignedIn>
        <h2>{user?.id}</h2>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </section>
  );
}
