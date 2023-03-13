import "./global.css";
import type { Metadata } from "next";
// styled components configuration
import StyledComponentsRegistry from "../lib/styledComponentsRegistry";
import Link from "next/link";
import Nav from "@/components/nav";

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
        <Nav />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
