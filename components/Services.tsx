import { SERVICES } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 bg-white/[0.015] py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            What I offer
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Level up your <span className="grad-text">trading game</span>
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Whether you&apos;re placing your first trade or refining a working system — pick the
            lane that fits where you are right now.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <div className="glass group flex h-full flex-col rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-500/10">
                <span className="text-4xl transition duration-300 group-hover:scale-110">
                  {s.icon}
                </span>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{s.text}</p>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 transition hover:gap-3 hover:text-emerald-300"
                >
                  {s.cta} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
