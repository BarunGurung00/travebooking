import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { WishlistProvider } from "./components/wishlist/WishlistProvider";
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-[100dvh] bg-[#f8f9fa]">
        <SessionProvider>
          <WishlistProvider>
            <div className="min-h-[100dvh] flex flex-col">
              <SiteHeader />
              <div className="flex-1 flex flex-col pt-16">{children}</div>
              <SiteFooter />
            </div>
          </WishlistProvider>
        </SessionProvider>
      </body>
    </html>
  );
}