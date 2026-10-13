import { SITE } from "@/lib/site";
import { SocialRow } from "./Navbar";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-black text-[#04060b]">
            HK
          </span>
          <span className="font-bold tracking-tight">
            Crypto <span className="text-emerald-400">by HK</span>
          </span>
        </a>
        <SocialRow />
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-slate-400">
          <a href="#about" className="hover:text-emerald-400">About</a>
          <a href="#journey" className="hover:text-emerald-400">Journey</a>
          <a href="#services" className="hover:text-emerald-400">Services</a>
          <a href="#booking" className="hover:text-emerald-400">Book a Call</a>
          <a href="#community" className="hover:text-emerald-400">Community</a>
        </div>
        <p className="max-w-xl text-xs leading-relaxed text-slate-600">
          Educational content only — not financial advice. Crypto trading involves substantial
          risk; never trade money you can&apos;t afford to lose.
        </p>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} {SITE.brand} · {SITE.name}
        </p>
      </div>
    </footer>
  );
}
