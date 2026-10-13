import { SITE, TIMELINE } from "@/lib/site";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
      <div className="orb right-[-100px] top-[100px] h-[300px] w-[300px] bg-emerald-500/10" />
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">About</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Trader first. <span className="grad-text">Mentor always.</span>
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <Reveal delay={100}>
          <div className="glass rounded-3xl p-8 leading-relaxed text-slate-300">
            <p>
              I&apos;m <span className="font-bold text-white">{SITE.name}</span>, the face behind{" "}
              <span className="font-bold text-emerald-400">{SITE.brand}</span>. My edge was never
              luck — it&apos;s a boring, repeatable system: read structure, wait for the setup,
              manage risk ruthlessly, and let winners run.
            </p>
            <p className="mt-4">
              Today I trade full-time and teach others to do the same — no hype, no
              &quot;guaranteed profits&quot;, just real market mechanics, honest breakdowns, and a
              community that keeps each other sharp.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Spot Trading", "Futures", "Risk Management", "Market Structure", "On-chain Basics", "Trading Psychology"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </Reveal>

        <div id="journey" className="relative scroll-mt-24">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-emerald-400 via-emerald-400/40 to-transparent" />
          <div className="space-y-8">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 100}>
                <div className="relative pl-10">
                  <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-emerald-400 bg-[#04060b] shadow-[0_0_12px_rgba(0,214,143,0.8)]" />
                  <p className="text-sm font-black text-emerald-400">{t.year}</p>
                  <h3 className="mt-1 text-xl font-bold">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
