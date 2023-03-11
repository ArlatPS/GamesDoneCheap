import "./global.css";
import type { Metadata } from "next";
// styled components configuration
import StyledComponentsRegistry from "../lib/styledComponentsRegistry";
import Link from "next/link";

// metadata for the site
export const metadata: Metadata = {
  title: "GG",
  description:
    "Ongoing project of game prices comparison website using CheapShark API",
};

// layout for the root
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href={"/"}>Home</Link>
          <Link href={"/deals"}>All Deals</Link>
        </nav>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
