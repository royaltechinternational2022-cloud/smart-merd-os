"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const POS = [
  { x: 10, y: 15 },
  { x: 85, y: 10 },
  { x: 6, y: 75 },
  { x: 90, y: 70 },
  { x: 48, y: 92 },
];

export function Problem() {
  const { t } = useLanguage();

  return (
    <section id="hvordan" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight max-w-xl">
              {t.problem.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-text-secondary leading-relaxed max-w-xl">{t.problem.p1}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-text-secondary leading-relaxed max-w-xl">{t.problem.p2}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-5 text-text-secondary leading-relaxed max-w-xl">{t.problem.p3}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-10 text-xl sm:text-2xl font-medium text-gradient">{t.problem.highlight}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative aspect-square max-w-md mx-auto">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              {POS.map((p, i) => (
                <line
                  key={i}
                  x1={p.x}
                  y1={p.y}
                  x2={50}
                  y2={50}
                  stroke="url(#problemGrad)"
                  strokeWidth={0.35}
                  className="animate-dash-flow"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
              <defs>
                <linearGradient id="problemGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.85" />
                </linearGradient>
              </defs>
            </svg>

            {POS.map((p, i) => (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl glass px-3 py-2 text-[11px] text-text-secondary text-center leading-tight animate-drift"
                style={{ left: `${p.x}%`, top: `${p.y}%`, width: 96, animationDelay: `${i * 0.4}s` }}
              >
                {t.problem.sources[i]}
              </div>
            ))}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 rounded-full glass-strong flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.35)]">
                <span className="w-4 h-4 rounded-full bg-[image:var(--gradient-brand)] animate-pulse-soft" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
