import {
  currentUser,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs/app-beta";

export default async function UserDeals() {
  const user = await currentUser();

  return (
    <SignedIn>
      <h2>Deals for {user?.username}</h2>
    </SignedIn>
  );
}
