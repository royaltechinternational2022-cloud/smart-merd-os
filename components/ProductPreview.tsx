"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const sidebarIcons = [
  "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z",
  "M3 17l6-6 4 4 8-8",
  "M4 6h16M4 6l2 14h12l2-14M9 10v6M15 10v6",
  "M12 3a9 9 0 1 0 9 9M12 3v9l6 3",
  "M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-4v4l2.5 2.5",
  "M9 12l2 2 4-4M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z",
  "M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2Z",
  "M13 2 3 14h7l-1 8 10-12h-7l1-8Z",
];

export function ProductPreview() {
  const { t } = useLanguage();

  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-center">
            {t.product.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-text-secondary text-center max-w-xl mx-auto">{t.product.sub}</p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-14 rounded-3xl glass-strong overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
            {/* window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border-soft">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="ml-4 text-[11px] text-text-muted">Smart Merd OS™ — Lokalitet 4021</span>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* sidebar */}
              <div className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-border-soft p-4">
                <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
                  {t.product.sidebar.map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] whitespace-nowrap shrink-0 ${
                        i === 0
                          ? "bg-white/[0.06] text-white"
                          : "text-text-secondary hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="shrink-0">
                        <path d={sidebarIcons[i]} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* main */}
              <div className="flex-1 p-5 sm:p-7">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {t.product.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-border-soft bg-navy/40 p-4">
                      <div className="text-[10px] tracking-[0.12em] uppercase text-text-muted">{m.label}</div>
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="text-xl font-semibold text-white">{m.value}</span>
                        {m.trend && (
                          <span
                            className={`text-[11px] font-medium ${
                              m.trend.startsWith("-") ? "text-amber-400" : "text-cyan"
                            }`}
                          >
                            {m.trend}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* insights */}
                <div className="mt-6 rounded-xl border border-border-strong bg-[image:var(--gradient-brand-soft)] p-5">
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-violet">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse-soft" />
                    {t.product.insightsLabel}
                  </div>
                  <div className="mt-2.5 text-base font-medium text-white">{t.product.insightTitle}</div>

                  <div className="mt-4 grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] tracking-[0.12em] uppercase text-text-muted">
                        {t.product.factorsLabel}
                      </div>
                      <ul className="mt-2 space-y-1.5">
                        {t.product.factors.map((f) => (
                          <li key={f} className="text-xs text-text-secondary flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-cyan/70" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.12em] uppercase text-text-muted">
                        {t.product.recommendationLabel}
                      </div>
                      <p className="mt-2 text-xs text-text-secondary leading-relaxed">{t.product.recommendationValue}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-[10px] tracking-[0.12em] uppercase text-text-muted mb-1.5">
                      <span>{t.product.confidenceLabel}</span>
                      <span className="text-white font-medium">87%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[87%] rounded-full bg-[image:var(--gradient-brand)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
