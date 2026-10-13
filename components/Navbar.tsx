"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { SOCIAL_ICONS } from "./icons";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#services", label: "Services" },
  { href: "#community", label: "Community" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "glass shadow-lg shadow-black/40" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
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
        <div className="flex items-center gap-3">
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noreferrer"
            className="animate-pulse-ring hidden rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-[#04060b] transition hover:bg-emerald-400 sm:block"
          >
            Book 1-on-1 Call
          </a>
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`h-0.5 w-5 bg-white transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-white transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-96 border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-5 py-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 font-medium text-slate-200 transition hover:bg-white/5 hover:text-emerald-400"
            >
              {l.label}
            </a>
          ))}
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-[#04060b]"
          >
            📞 Book 1-on-1 Call
          </a>
        </div>
      </div>
    </header>
  );
}

export function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {SITE.socials.map((s) => {
        const Icon = SOCIAL_ICONS[s.key];
        return (
          <a
            key={s.key}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition hover:-translate-y-1 hover:border-emerald-400/50 hover:text-emerald-400"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
