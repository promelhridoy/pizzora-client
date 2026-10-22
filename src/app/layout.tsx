import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import UIProviders from "../components/providers/UIProviders";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pizzora — Hand-tossed, delivered hot",
  description: "Build your own pizza and get it delivered fresh, fast, and hot.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-cream font-sans text-ink antialiased dark:bg-[#0B0F14] dark:text-gray-50">
        <UIProviders>{children}</UIProviders>
      </body>
    </html>
  );
}