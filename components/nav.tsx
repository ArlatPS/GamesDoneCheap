import Link from "next/link";
import SearchBar from "./nav/searchBar";

export default function Nav() {
  return (
    <nav>
      <Link href={"/"}>Home</Link>
      <Link href={"/deals"}>All Deals</Link>
      <SearchBar />
    </nav>
  );
}
