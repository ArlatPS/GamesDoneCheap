import Image from "next/image";
import { Inter } from "next/font/google";
import { StyledHi } from "./styledPage";
import Test from "@/components/test";

export default async function Home() {
  return (
    <main>
      <Test />
    </main>
  );
}
