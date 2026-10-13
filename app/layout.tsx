import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Hassan Khan — Crypto Trader & Mentor | Crypto by HK",
  description:
    "Hassan Khan (Crypto by HK): crypto trader and mentor. 1-on-1 mentorship calls, trade signals and portfolio reviews. Book your call today.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="bg-[#04060b] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
