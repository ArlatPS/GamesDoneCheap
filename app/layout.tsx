import "./global.css";
import type { Metadata } from "next";
// styled components configuration
import StyledComponentsRegistry from "../lib/styledComponentsRegistry";
import Nav from "@/components/nav/nav";

// fonts
import { Space_Mono, Orienta, Prompt } from "next/font/google";

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--space-mono",
});

const orienta = Orienta({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--orienta",
});

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
  display: "swap",
  variable: "--prompt",
});

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
    <html
      lang="en"
      className={`${space_mono.variable} ${orienta.variable} ${prompt.variable}`}
    >
      <body>
        <Nav />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
