import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { FontSwitcher } from "@/components/FontSwitcher";
import { getFontPath } from "@/lib/font-utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Scheikunde Quiz",
  description: "Leer scheikunde met quizzen en flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the correct font paths based on environment
  const regularFontPath = getFontPath('/static/fonts/OpenDyslexic-Regular.woff2');
  const boldFontPath = getFontPath('/static/fonts/OpenDyslexic-Bold.woff2');

  return (
    <html lang="nl" data-font="dyslexic">
      <head>
        {/* Preload fonts to ensure they are available */}
        <link 
          rel="preload" 
          href={regularFontPath} 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href={boldFontPath}
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <style dangerouslySetInnerHTML={{ __html: `
          /* Fallback for OpenDyslexic */
          @font-face {
            font-family: 'OpenDyslexic';
            src: url('${regularFontPath}') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'OpenDyslexic';
            src: url('${boldFontPath}') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        `}} />
      </head>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable} ${geistMono.variable}`}
      >
        <FontSwitcher />
        {children}
      </body>
    </html>
  );
}
