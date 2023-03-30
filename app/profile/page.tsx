import { DealsListGame } from "@/globalTypes";
import getStores from "@/lib/getStores";
import { getUserGamesIds } from "@/lib/userLib/getUserGamesIds";
import { GameFromSharkWithID } from "@/lib/userLib/sortUserGamesBySavings";
import { ProfileMainStyled } from "@/style/profile/profileStyled";
import { theme } from "@/theme";
import {
  SignedIn,
  SignedOut,
  UserProfile,
  SignIn,
  currentUser,
} from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import UserGames from "./userGames";

export default async function UserPage() {
  const user = await currentUser();
  let userGamesIds: string[] = [];
  if (user !== null) {
    userGamesIds = await getUserGamesIds(user.id);
  }
  return (
    <ProfileMainStyled>
      <SignedIn>
        <section className="signedInSection">
          <UserGames userGamesIds={userGamesIds} />
          <div className="userProfile">
            <UserProfile
              appearance={{
                baseTheme: dark,
                variables: {
                  colorBackground: theme.colors.night,
                },
                elements: {
                  navbar: { flexBasis: "4rem" },
                  card: { width: "100%" },
                  rootBox: { width: "100%" },
                },
              }}
            />
          </div>
        </section>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </ProfileMainStyled>
  );
}
