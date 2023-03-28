import { GameFromShark } from "@/globalTypes";
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
  let games: GameFromShark[] = [];
  if (user !== null) {
    userGamesIds = await getUserGamesIds(user.id);
    // if userGameIds not empty then fetch first 25 (max for one fetch to this API) from Shark
    if (userGamesIds.length > 0) {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?ids=${userGamesIds.join(
          ","
        )}`,
        { next: { revalidate: 10 } }
      );
      games = await response.json();
    }
  }
  return (
    <SignedIn>
      <h2>Deals for {user?.username}</h2>
      <h3>{games[128]?.info?.title}</h3>
    </SignedIn>
  );
}
