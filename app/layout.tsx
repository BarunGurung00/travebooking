import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyHimalayanTrip",
  description: "Nepal's Travel & Treks Guide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-[#f8f9fa]">
        <SessionProvider>
          <SiteHeader />
          <div className="flex-1 flex flex-col">{children}</div>
          <SiteFooter />
        </SessionProvider>
      </body>
    </html>
  );
}