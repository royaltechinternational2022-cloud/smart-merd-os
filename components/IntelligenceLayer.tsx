"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function IntelligenceLayer() {
  const { t } = useLanguage();

  return (
    <section id="teknologi" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-center max-w-2xl mx-auto">
            {t.intelligence.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-text-secondary text-center max-w-2xl mx-auto leading-relaxed">{t.intelligence.p1}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-3 text-text-secondary text-center max-w-2xl mx-auto leading-relaxed">{t.intelligence.p2}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 rounded-3xl glass p-6 sm:p-10">
            <ArchitectureDiagram />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArchitectureDiagram() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Existing systems row */}
      <div className="w-full">
        <div className="text-center text-[10px] tracking-[0.2em] uppercase text-text-muted mb-4">
          {t.intelligence.existingLabel}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {t.intelligence.existing.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-border-soft bg-navy/50 px-3 py-3 text-center text-[11px] text-text-secondary leading-tight"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* connecting lines */}
      <svg viewBox="0 0 400 60" className="w-full max-w-md h-12" aria-hidden="true">
        <defs>
          <linearGradient id="archUp" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {[40, 140, 200, 260, 360].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1={60}
            x2={200}
            y2={0}
            stroke="url(#archUp)"
            strokeWidth="1.4"
            className="animate-dash-flow"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>

      {/* Hub */}
      <div className="rounded-2xl glass-strong px-8 py-4 shadow-[0_0_50px_rgba(124,92,252,0.3)]">
        <span className="text-sm sm:text-base font-semibold text-gradient tracking-wide">{t.intelligence.hub}</span>
      </div>

      {/* connecting lines down */}
      <svg viewBox="0 0 400 60" className="w-full max-w-md h-12" aria-hidden="true">
        <defs>
          <linearGradient id="archDown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {[60, 160, 240, 340].map((x, i) => (
          <line
            key={i}
            x1={200}
            y1={0}
            x2={x}
            y2={60}
            stroke="url(#archDown)"
            strokeWidth="1.4"
            className="animate-dash-flow"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>

      {/* Outputs */}
      <div className="w-full">
        <div className="text-center text-[10px] tracking-[0.2em] uppercase text-text-muted mb-4">
          {t.intelligence.outputLabel}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {t.intelligence.outputs.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-border-strong px-3 py-3 text-center text-[11px] font-medium text-white bg-[image:var(--gradient-brand-soft)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
