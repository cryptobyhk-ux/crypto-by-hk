import { SITE } from "@/lib/site";
import { SOCIAL_ICONS } from "./icons";
import { Reveal } from "./Reveal";

const HOVER: Record<string, string> = {
  instagram: "group-hover:text-pink-400",
  facebook: "group-hover:text-[#1877F2]",
  tiktok: "group-hover:text-white",
  discord: "group-hover:text-[#5865F2]",
};

export function Community() {
  return (
    <section id="community" className="relative scroll-mt-24 bg-white/[0.015] py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Join the community
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Follow <span className="grad-text">{SITE.brand}</span> everywhere
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Daily breakdowns, trade ideas and live sessions — pick your platform and never miss a
            move. <span className="text-slate-500">(Sample links for now.)</span>
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SITE.socials.map((s, i) => {
            const Icon = SOCIAL_ICONS[s.key];
            return (
              <Reveal key={s.key} delay={i * 100}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass group block rounded-3xl p-7 transition duration-300 hover:-translate-y-2 hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  <span className={`text-slate-300 transition duration-300 ${HOVER[s.key]}`}>
                    <Icon className="h-10 w-10 transition duration-300 group-hover:scale-110" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{s.label}</h3>
                  <p className="mt-1 text-sm text-emerald-400">{s.handle}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-400 transition group-hover:text-white">
                    Follow →
                  </p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
