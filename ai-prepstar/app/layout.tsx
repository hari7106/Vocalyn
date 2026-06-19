import type { Metadata } from "next";
import { Outfit } from "next/font/google";
// @ts-ignore: allow importing global CSS without type declarations
import "./globals.css";

export const metadata: Metadata = {
  title: "Vocalyn | AI Mock Interview Platform",
  description: "Prepare for your interviews with AI-powered mock interviews and personalized feedback.",
};
const outfit = Outfit({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-cursorstyle="true">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
