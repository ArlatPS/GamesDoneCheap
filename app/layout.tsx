import "./global.css";
import type { Metadata } from "next";
// styled components configuration
import StyledComponentsRegistry from "../lib/styledComponentsRegistry";

// metadata for the site
export const metadata: Metadata = {
  title: "GG clone",
  description: "Ongoing project of GG.deals clone with CheapShark API",
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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
