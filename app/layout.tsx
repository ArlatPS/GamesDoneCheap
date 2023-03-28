import "./global.css";
import type { Metadata } from "next";
// styled components configuration
import StyledComponentsRegistry from "../lib/styledComponentsRegistry";
import Nav from "@/components/nav/nav";

// clerk authentication
import { ClerkProvider } from "@clerk/nextjs/app-beta";

// fonts
import { Space_Mono, Orienta, Prompt } from "next/font/google";
import Footer from "@/components/footer";
import { theme } from "@/theme";

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
  title: "Games Done Cheap",
  description:
    "Website to check out best video game deals and compare prices on \
    different platforms created with Next JS 13 by Przemysław Sulich",
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
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: theme.colors.red,
              colorText: theme.colors.night,
              fontFamily: "sans-serif",
              colorSuccess: theme.colors.blue,
              colorDanger: theme.colors.red,
            },
          }}
        >
          <Nav />
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
