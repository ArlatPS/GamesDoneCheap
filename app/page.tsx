import Image from "next/image";
import { Inter } from "next/font/google";
import { StyledHi } from "./styledPage";
import Test from "@/components/test";
import BestDeals from "@/components/bestDeals";

// due to current lack of support for server component that is async
// it has to be casted as any to compile
const BestDealsAny = BestDeals as any;

export default function Home() {
  return (
    <main>
      <Test />
      <BestDealsAny />
    </main>
  );
}
