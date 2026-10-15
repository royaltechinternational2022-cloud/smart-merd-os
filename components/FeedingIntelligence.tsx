"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeader, Tag } from "./ui";

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

  const colors = STATE_COLORS[states[active].key as keyof typeof STATE_COLORS];

  return (
    <section id="feeding" className="section overflow-hidden">
      <div className="absolute inset-0 bg-[image:var(--gradient-radial-glow)] opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t.feeding.eyebrow} title={t.feeding.headline} sub={t.feeding.text} />

        <Reveal delay={0.15}>
          <div className="mt-14 rounded-3xl glass p-6 sm:p-10">
            {/* variables the feeding use case connects */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {t.feeding.variables.map((v, i) => (
                <span key={v} className="flex items-center gap-2.5">
                  <span
                    className="rounded-full border border-border-soft px-4 py-2 text-xs text-text-secondary transition-all duration-500"
                    style={{ boxShadow: `0 0 0 1px ${colors.ring} inset` }}
                  >
                    {v}
                  </span>
                  {i < t.feeding.variables.length - 1 && <span className="text-border-strong text-sm" aria-hidden="true">→</span>}
                </span>
              ))}
            </div>

            {/* state tabs */}
            <div className="mt-8 grid sm:grid-cols-3 gap-3">
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

            {/* customer value */}
            <div className="mt-8 pt-8 border-t border-border-soft grid sm:grid-cols-3 gap-6">
              {t.feeding.value.map((v) => (
                <div key={v.title}>
                  <div className="text-sm font-semibold text-white">{v.title}</div>
                  <div className="mt-1.5 text-sm text-text-secondary">{v.text}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex justify-center">
          <Tag kind="inDevelopment">{t.feeding.note}</Tag>
        </div>
      </div>
    </section>
  );
}
