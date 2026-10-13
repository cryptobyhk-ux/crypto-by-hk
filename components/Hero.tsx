"use client";

import Image from "next/image";
import { SITE, TICKER } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
      {/* backdrop */}
      <div className="grid-bg absolute inset-0" />
      <div className="orb left-[-120px] top-[-80px] h-[420px] w-[420px] bg-emerald-500/20" />
      <div className="orb right-[-140px] top-[220px] h-[380px] w-[380px] bg-amber-500/10" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {SITE.brand} — {SITE.role}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-[2.65rem] font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Master the
              <br />
              <span className="grad-text text-glow">Crypto Markets.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
              I&apos;m <span className="font-semibold text-white">{SITE.name}</span> — I help
              traders read the market with clarity, manage risk like a pro, and build
              conviction through mentorship, signals and honest breakdowns.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noreferrer"
                className="animate-pulse-ring rounded-full bg-emerald-500 px-7 py-3.5 font-bold text-[#04060b] transition hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                📞 Book 1-on-1 Call
              </a>
              <a
                href="#journey"
                className="glass rounded-full px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:border-emerald-400/40"
              >
                My Journey ↓
              </a>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-3">
                {["AK", "SR", "MB", "+9"].map((t, i) => (
                  <span
                    key={t}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#04060b] text-xs font-bold text-white ${
                      ["bg-emerald-600", "bg-amber-600", "bg-sky-600", "bg-slate-700"][i]
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p>
                <span className="font-bold text-white">500+ traders</span> mentored
                <br className="sm:hidden" /> across the community
              </p>
            </div>
          </Reveal>
        </div>

        {/* photo */}
        <Reveal delay={200} className="flex justify-center">
          <div className="animate-floaty relative">
            <div className="animate-spin-slow absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/30 via-transparent to-amber-500/30 blur-xl" />
            <div className="relative rounded-[2rem] bg-gradient-to-br from-emerald-400/60 via-white/10 to-amber-400/60 p-[3px] shadow-2xl shadow-emerald-500/20">
              <div className="relative h-80 w-72 overflow-hidden rounded-[calc(2rem-3px)] sm:h-[26rem] sm:w-[22rem]">
                <Image
                  src="/hassan.png"
                  alt="Hassan Khan — Crypto by HK"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 pt-16">
                  <p className="text-xl font-black text-white">{SITE.name}</p>
                  <p className="text-sm font-semibold text-emerald-400">{SITE.role}</p>
                </div>
              </div>
            </div>
            <div className="glass absolute -left-3 top-8 rounded-2xl px-4 py-3 text-sm sm:-left-6">
              <p className="font-bold text-emerald-400">+5 yrs</p>
              <p className="text-xs text-slate-400">market experience</p>
            </div>
            <div className="glass absolute -right-3 bottom-8 rounded-2xl px-4 py-3 text-sm sm:-right-6">
              <p className="font-bold text-amber-400">Risk-first</p>
              <p className="text-xs text-slate-400">trading system</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ticker */}
      <div className="relative mt-16 overflow-hidden border-y border-white/10 bg-black/40 py-3.5">
        <div className="ticker-track gap-10 px-5">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm">
              <span className="font-bold text-white">{t.pair}</span>
              <span className={t.change.startsWith("+") ? "text-emerald-400" : "text-rose-400"}>
                {t.change}
              </span>
              <span className="ml-4 text-slate-700">◆</span>
            </span>
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] text-slate-600">
          Illustrative prices — not live data
        </p>
      </div>
    </section>
  );
}
