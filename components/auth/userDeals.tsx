import { getUserGamesIds } from "@/lib/userLib/getUserGamesIds";
import {
  currentUser,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs/app-beta";
import { use } from "react";

export default async function UserDeals() {
  const user = await currentUser();
  let userGamesIds: string[] = [];
  if (user !== null) {
    userGamesIds = await getUserGamesIds(user.id);
  }
  return (
    <SignedIn>
      <h2>Deals for {user?.username}</h2>
      <h3>{userGamesIds[0]}</h3>
    </SignedIn>
  );
}
