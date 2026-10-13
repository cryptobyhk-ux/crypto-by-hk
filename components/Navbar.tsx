"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#services", label: "Services" },
  { href: "#community", label: "Community" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/40" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-black text-[#04060b]">
            HK
          </span>
          <span className="font-bold tracking-tight">
            Crypto <span className="text-emerald-400">by HK</span>
          </span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-300 transition hover:text-emerald-400"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={SITE.calendly}
          target="_blank"
          rel="noreferrer"
          className="animate-pulse-ring rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-[#04060b] transition hover:bg-emerald-400"
        >
          Book 1-on-1 Call
        </a>
      </nav>
    </header>
  );
}
