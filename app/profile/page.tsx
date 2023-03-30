import { ProfileMainStyled } from "@/style/profile/profileStyled";
import { theme } from "@/theme";
import {
  SignedIn,
  SignedOut,
  UserProfile,
  SignIn,
} from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";

export default async function UserPage() {
  return (
    <ProfileMainStyled>
      <SignedIn>
        <section className="signedInSection">
          <div className="userGames"></div>
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
