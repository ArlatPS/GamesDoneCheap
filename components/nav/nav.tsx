import { NavStyled } from "@/style/nav";
import Link from "next/link";
import GDCLogo from "../svg/GDCLogo";
import DropDownStores from "./dropDownStores";
import SearchBar from "./searchBar";

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
    </NavStyled>
  );
}
