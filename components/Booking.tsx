import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

const POINTS = [
  "30-minute private video call — your questions, answered live",
  "Strategy & portfolio review with actionable next steps",
  "Risk-management framework tailored to your capital",
  "Recording + written summary after the call",
];

export function Booking() {
  return (
    <section id="booking" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
          <div className="orb left-[-80px] top-[-80px] h-[280px] w-[280px] bg-emerald-500/20" />
          <div className="orb bottom-[-100px] right-[-60px] h-[280px] w-[280px] bg-amber-500/10" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
                1-on-1 Mentorship
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Book your call with <span className="grad-text">{SITE.name.split(" ")[0]}</span>
              </h2>
              <p className="mt-4 text-slate-400">
                Pick a time that suits you on Calendly — no back-and-forth, no waiting. Show up
                with your questions, leave with a plan.
              </p>
              <ul className="mt-6 space-y-3">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-black/40 p-10 text-center">
              <span className="text-6xl">📅</span>
              <h3 className="mt-4 text-2xl font-black">Free intro call</h3>
              <p className="mt-2 text-sm text-slate-400">
                30 minutes · Video call · No commitment
              </p>
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noreferrer"
                className="animate-pulse-ring mt-8 w-full rounded-full bg-emerald-500 px-8 py-4 text-lg font-black text-[#04060b] transition hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                🗓 Open My Calendar
              </a>
              <p className="mt-4 text-xs text-slate-500">
                Powered by Calendly · sample link — Hassan&apos;s real scheduling link goes here
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
