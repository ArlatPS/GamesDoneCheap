import Image from "next/image";
import { Inter } from "next/font/google";
import { StyledHi } from "./styledPage";
import BestDeals from "@/app/bestDeals";
import HeaderWithEffect from "@/components/root/headerWithEffect";

// due to current lack of support from TS for server component that is async
// it has to be casted as any to compile
const BestDealsAny = BestDeals as any;
export default function Home() {
  return (
    <main>
      <HeaderWithEffect text="Games Done Cheap" />
      <BestDealsAny />
    </main>
  );
}
