import { NavStyled } from "@/style/nav";
import Link from "next/link";
import GDCLogo from "../svg/GDCLogo";
import DropDownStores from "./dropDownStores";
import SearchBar from "./searchBar";

// clerk
import {
  currentUser,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs/app-beta";
import { dark } from "@clerk/themes";
import SignInButtonClientComponent from "../auth/signInButtonClientComponent";
import { theme } from "@/theme";

export default function Nav() {
  return (
    <NavStyled>
      <section className="leftSection">
        <Link href={"/"}>Home</Link>
        <Link href={"/deals"}>All Deals</Link>
        <DropDownStores />
      </section>
      <div className="divWithLogo">
        <GDCLogo />
        GAMES DONE CHEAP
      </div>
      <SearchBar />
      <div className="user">
        <SignedIn>
          <UserButton
            userProfileMode="navigation"
            userProfileUrl={"/profile"}
            appearance={{
              baseTheme: dark,
              variables: {
                colorBackground: theme.colors.night,
                colorText: theme.colors.white,
                colorTextSecondary: theme.colors.white,
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButtonClientComponent />
        </SignedOut>
      </div>
    </NavStyled>
  );
}
