"use client";

import { useLanguage } from "@/lib/i18n";
import { requestContact, TOPIC } from "@/lib/demo";
import { MODE_STYLE, type ModeKey } from "@/lib/modes";
import { Reveal } from "./Reveal";

const MODE_ICON: Record<ModeKey, React.ReactNode> = {
  // clock with back arrow
  historic: <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />,
  // pulse
  live: <path d="M3 12h4l2-6 4 12 2-6h6" strokeLinecap="round" strokeLinejoin="round" />,
  // branching paths
  simulation: <path d="M5 4v6a4 4 0 0 0 4 4h6M15 14l-3-3m3 3-3 3M19 4v4m0 0a2 2 0 1 0 0 .01" strokeLinecap="round" strokeLinejoin="round" />,
};

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background */}
      <div className="absolute inset-0 bg-void" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 20%, rgba(59,130,246,0.18) 0%, transparent 70%), radial-gradient(40% 40% at 85% 60%, rgba(124,92,252,0.14) 0%, transparent 70%), radial-gradient(35% 35% at 10% 70%, rgba(245,158,11,0.07) 0%, transparent 70%), linear-gradient(180deg, #05070d 0%, #070a13 60%, #05070d 100%)",
          }}
        />
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cyan/40 animate-float-slow"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 0.7}s`,
              animationDuration: `${6 + (i % 5)}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 eyebrow tracking-[0.3em]">
            {t.hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-7 font-semibold tracking-tight text-white leading-[1.08] text-[clamp(1.7rem,1rem+4.2vw,4.25rem)]">
            <span className="block">{t.hero.line1}</span>
            <span className="block">{t.hero.line2}</span>
            <span className="block text-gradient">{t.hero.line3}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-7 mx-auto max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed">{t.hero.sub}</p>
        </Reveal>

        {/* Three operating modes */}
        <div className="mt-12 grid gap-4 md:grid-cols-3 text-left">
          {t.hero.modes.map((m, i) => {
            const key = m.key as ModeKey;
            const s = MODE_STYLE[key];
            return (
              <Reveal key={m.key} delay={0.22 + i * 0.08}>
                <a
                  href="#modes"
                  className={`group relative block h-full rounded-2xl border ${s.border} bg-panel/80 p-5 sm:p-6 flex items-center gap-4 md:block transition-all duration-300 hover:-translate-y-1`}
                  style={{ boxShadow: s.glow }}
                >
                  <div className="absolute inset-x-0 top-0 h-px opacity-70" style={{ background: `linear-gradient(90deg, transparent, ${s.hex}, transparent)` }} aria-hidden="true" />
                  <div className={`w-11 h-11 shrink-0 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center ${s.text}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                      {MODE_ICON[key]}
                    </svg>
                  </div>
                  <div>
                    <h2 className={`md:mt-5 text-xl font-semibold ${s.text}`}>{m.label}</h2>
                    <p className="mt-1 md:mt-1.5 text-sm text-text-secondary">{m.text}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.5}>
          <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <button
              onClick={() => requestContact(TOPIC.pilot)}
              className="rounded-full px-8 py-3.5 text-sm font-medium text-white bg-[image:var(--gradient-brand)] hover:opacity-90 transition-all hover:scale-[1.02] shadow-[var(--shadow-glow-sm)]"
            >
              {t.hero.ctaPrimary}
            </button>
            <a
              href="#modes"
              className="rounded-full px-8 py-3.5 text-sm font-medium text-white text-center border border-border-strong hover:bg-white/5 transition-colors"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
