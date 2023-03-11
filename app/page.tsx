import Image from "next/image";
import { Inter } from "next/font/google";
import { StyledHi } from "./styledPage";
import BestDeals from "@/app/bestDeals";
import AllDeals from "./allDeals";

// due to current lack of support from TS for server component that is async
// it has to be casted as any to compile
const BestDealsAny = BestDeals as any;
export default function Home() {
  return (
    <main>
      <h1>Welcome to GG</h1>
      <BestDealsAny />
      <AllDeals />
    </main>
  );
}
