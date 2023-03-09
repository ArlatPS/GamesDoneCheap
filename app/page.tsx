import Image from "next/image";
import { Inter } from "next/font/google";
import { StyledHi } from "./styledPage";
import Test from "@/components/test";
import Deals from "@/components/deals";
export default function Home() {
  return (
    <main>
      <Test />
      <Deals />
    </main>
  );
}
