"use client";

import { useLanguage } from "@/lib/i18n";

/**
 * Small conceptual interface mockups for the three operating modes.
 * All data is illustrative: it is labelled as such where these are used.
 */

const frame = "rounded-xl border border-border-soft bg-navy/70 p-4 min-h-[16.5rem]";
const label = "text-[10px] tracking-[0.12em] uppercase text-text-muted";

export function HistoricMock() {
  const { t } = useLanguage();
  const m = t.modes.items[0].mock as { title: string; deviation: string; causeLabel: string; cause: string };
  // x: 0..100, y: 0..50 (lower = higher value)
  const line = "0,14 10,16 20,13 30,17 40,15 50,18 60,16 70,30 80,40 90,34 100,38";
  return (
    <div className={frame}>
      <div className={label}>{m.title}</div>
      <svg viewBox="0 0 100 50" className="mt-3 w-full h-28" preserveAspectRatio="none" aria-hidden="true">
        <rect x="62" y="0" width="38" height="50" fill="#f59e0b" fillOpacity="0.1" />
        {[12, 25, 38].map((y) => (
          <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(148,163,209,0.12)" strokeWidth="0.3" />
        ))}
        <polyline points={line} fill="none" stroke="#f59e0b" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <circle cx="80" cy="40" r="1.8" fill="#f59e0b" />
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="rounded-full border border-historic/40 bg-historic/10 px-2.5 py-1 text-historic font-medium">{m.deviation}</span>
        <span className="text-text-muted">{m.causeLabel}:</span>
        <span className="text-text-secondary">{m.cause}</span>
      </div>
    </div>
  );
}

export function LiveMock() {
  const { t } = useLanguage();
  const m = t.modes.items[1].mock as {
    title: string;
    rows: readonly { label: string; value: string; level: string }[];
    decisionLabel: string;
    decision: string;
  };
  return (
    <div className={frame}>
      <div className="flex items-center justify-between">
        <div className={label}>{m.title}</div>
        <span className="flex items-center gap-1.5 text-[10px] text-live font-medium tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse-soft" aria-hidden="true" />
          LIVE
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {m.rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-xs">
            <span className="text-text-secondary">{r.label}</span>
            <span className={`font-medium ${r.level === "warn" ? "text-amber-400" : "text-live"}`}>{r.value}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-lg border border-live/35 bg-live/10 px-3 py-2.5">
        <div className="text-[10px] tracking-[0.12em] uppercase text-live">{m.decisionLabel}</div>
        <div className="mt-1 text-xs text-white leading-snug">{m.decision}</div>
      </div>
    </div>
  );
}

export function SimulationMock() {
  const { t } = useLanguage();
  const m = t.modes.items[2].mock as { title: string; scenarios: readonly string[]; outcomeLabel: string };
  // Illustrative bar lengths only: not results.
  const widths = [48, 78, 34];
  return (
    <div className={frame}>
      <div className={label}>{m.title}</div>
      <ul className="mt-3 space-y-3">
        {m.scenarios.map((s, i) => (
          <li key={s}>
            <div className="flex items-center justify-between text-xs">
              <span className={i === 1 ? "text-white font-medium" : "text-text-secondary"}>
                {String.fromCharCode(65 + i)} · {s}
              </span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${widths[i]}%`,
                  background: i === 1 ? "linear-gradient(90deg,#7c5cfc,#a855f7)" : "rgba(168,85,247,0.35)",
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 text-[10px] tracking-[0.12em] uppercase text-text-muted">{m.outcomeLabel}</div>
    </div>
  );
}
