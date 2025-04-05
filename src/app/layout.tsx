import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { FontSwitcher } from "@/components/FontSwitcher";

// Use Inter as a fallback until we resolve local font loading issues
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scheikunde Quiz",
  description: "Interactive chemistry quiz and flashcards for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" data-font="opentype">
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        {/* The FontSwitcher is rendered on the client-side */}
        <FontSwitcher />
      </body>
    </html>
  );
}
