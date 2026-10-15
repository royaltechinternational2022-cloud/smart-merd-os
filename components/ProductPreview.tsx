"use client";

import { useLanguage } from "@/lib/i18n";
import { MODE_STYLE, type ModeKey } from "@/lib/modes";

const sidebarIcons = [
  "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z",
  "M3 12a9 9 0 1 0 3-6.7M3 4v5h5M12 7v5l3 2",
  "M3 12h4l2-6 4 12 2-6h6",
  "M5 4v6a4 4 0 0 0 4 4h6M15 14l-3-3m3 3-3 3",
  "M4 6h16M4 6l2 14h12l2-14M9 10v6M15 10v6",
  "M12 3a9 9 0 1 0 9 9M12 3v9l6 3",
  "M9 12l2 2 4-4M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z",
  "M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2Z",
];

// Sidebar index -> mode colour (indexes 1..3 are the three operating modes)
const SIDEBAR_MODE: Partial<Record<number, ModeKey>> = { 1: "historic", 2: "live", 3: "simulation" };

/** Large conceptual interface mockup. Illustrative data: labelled where used. */
export function InterfaceMockup() {
  const { t } = useLanguage();
  const ui = t.how.interface;
  const ACTIVE = 2; // Live

  return (
    <div className="rounded-3xl glass-strong overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border-soft">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="ml-4 text-[11px] text-text-muted truncate">{ui.window}</span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* sidebar */}
        <div className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-border-soft p-3 md:p-4">
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {ui.sidebar.map((item, i) => {
              const mode = SIDEBAR_MODE[i];
              const isActive = i === ACTIVE;
              return (
                <div
                  key={item}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] whitespace-nowrap shrink-0 ${
                    isActive ? "bg-white/[0.06] text-white" : "text-text-secondary"
                  }`}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={mode ? MODE_STYLE[mode].hex : "currentColor"}
                    strokeWidth="1.7"
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <path d={sidebarIcons[i]} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        {/* main */}
        <div className="flex-1 p-5 sm:p-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {ui.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-border-soft bg-navy/40 p-4">
                <div className="text-[10px] tracking-[0.12em] uppercase text-text-muted">{m.label}</div>
                <div className="mt-1.5 flex items-baseline gap-2 flex-wrap">
                  <span className="text-xl font-semibold text-white">{m.value}</span>
                  <span className={`text-[11px] font-medium ${m.trend.startsWith("-") ? "text-amber-400" : "text-cyan"}`}>
                    {m.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* insight */}
          <div className="mt-5 rounded-xl border border-live/30 bg-[image:var(--gradient-brand-soft)] p-5">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-live">
              <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse-soft" />
              {ui.insightsLabel}
            </div>
            <div className="mt-2.5 text-base font-medium text-white">{ui.insightTitle}</div>

            <div className="mt-4 grid sm:grid-cols-2 gap-5">
              <div>
                <div className="text-[10px] tracking-[0.12em] uppercase text-text-muted">{ui.factorsLabel}</div>
                <ul className="mt-2 space-y-1.5">
                  {ui.factors.map((f) => (
                    <li key={f} className="text-xs text-text-secondary flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-cyan/70" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.12em] uppercase text-text-muted">{ui.recommendationLabel}</div>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">{ui.recommendationValue}</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 grid sm:grid-cols-2 gap-5 items-end">
              {/* Confidence is an example only: dashed bar, no figure, labelled as not validated */}
              <div>
                <div className="flex items-center justify-between text-[10px] tracking-[0.12em] uppercase text-text-muted mb-1.5">
                  <span>{ui.confidenceLabel}</span>
                  <span className="text-amber-400 normal-case tracking-normal">{ui.confidenceNote}</span>
                </div>
                <div className="h-1.5 rounded-full border border-dashed border-border-strong overflow-hidden">
                  <div className="h-full w-[70%] bg-white/15" />
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.12em] uppercase text-text-muted mb-1.5">{ui.decisionLabel}</div>
                <div className="flex gap-2">
                  {ui.decisions.map((d, i) => (
                    <span
                      key={d}
                      className={`flex-1 text-center rounded-lg px-2 py-1.5 text-[11px] font-medium border ${
                        i === 0
                          ? "bg-[image:var(--gradient-brand)] border-transparent text-white"
                          : "border-border-strong text-text-secondary"
                      }`}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
