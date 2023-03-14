import Link from "next/link";
import GDCLogo from "../svg/GDCLogo";
import DropDownStores from "./dropDownStores";
import SearchBar from "./searchBar";

export default function Nav() {
  return (
    <nav>
      <Link href={"/"}>Home</Link>
      <Link href={"/deals"}>All Deals</Link>
      <DropDownStores />
      <GDCLogo />
      <SearchBar />
    </nav>
  );
}
