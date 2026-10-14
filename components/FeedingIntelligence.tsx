"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const STATE_COLORS = {
  normal: { dot: "#22d3ee", ring: "rgba(34,211,238,0.35)", label: "text-cyan" },
  change: { dot: "#a855f7", ring: "rgba(168,85,247,0.35)", label: "text-purple" },
  action: { dot: "#f59e0b", ring: "rgba(245,158,11,0.35)", label: "text-amber-400" },
};

export function FeedingIntelligence() {
  const { t } = useLanguage();
  const states = t.feeding.states;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % states.length), 4200);
    return () => clearInterval(id);
  }, [states.length]);

  const current = states[active];
  const colors = STATE_COLORS[current.key as keyof typeof STATE_COLORS];

  return (
    <section id="foring" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[image:var(--gradient-radial-glow)] opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{t.feeding.headline}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-text-secondary leading-relaxed">{t.feeding.p1}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-3 text-text-secondary leading-relaxed">{t.feeding.p2}</p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 rounded-3xl glass p-6 sm:p-10">
            {/* variable chips */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {t.feeding.variables.map((v, i) => (
                <span key={v} className="flex items-center gap-2.5">
                  <span
                    className="rounded-full border border-border-soft px-4 py-2 text-xs text-text-secondary transition-colors duration-500"
                    style={active >= 0 ? { boxShadow: `0 0 0 1px ${colors.ring} inset` } : undefined}
                  >
                    {v}
                  </span>
                  {i < t.feeding.variables.length - 1 && <span className="text-border-strong text-sm">→</span>}
                </span>
              ))}
            </div>

            {/* state tabs */}
            <div className="mt-10 grid sm:grid-cols-3 gap-3">
              {states.map((s, i) => {
                const c = STATE_COLORS[s.key as keyof typeof STATE_COLORS];
                const isActive = i === active;
                return (
                  <button
                    key={s.key}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`text-left rounded-xl border px-5 py-4 transition-all duration-300 ${
                      isActive ? "border-border-strong bg-white/[0.04]" : "border-border-soft hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full transition-all"
                        style={{ backgroundColor: c.dot, boxShadow: isActive ? `0 0 12px ${c.dot}` : "none" }}
                      />
                      <span className={`text-[11px] tracking-[0.15em] font-semibold ${isActive ? c.label : "text-text-muted"}`}>
                        {s.label}
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs text-text-secondary leading-relaxed">{s.text}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
