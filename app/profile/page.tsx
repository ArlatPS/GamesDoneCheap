import { ProfileMainStyled } from "@/style/profile/profileStyled";
import {
  currentUser,
  SignedIn,
  SignedOut,
  UserProfile,
  SignIn,
} from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";

export default async function UserPage() {
  const user = await currentUser();

  return (
    <ProfileMainStyled>
      <SignedIn>
        <section className="signedInSection">
          <div className="userGames">
            <h2>{user?.id}</h2>
          </div>
          <div className="userProfile">
            <UserProfile
              appearance={{
                baseTheme: dark,
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
