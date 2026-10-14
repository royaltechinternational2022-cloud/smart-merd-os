"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function DataToAction() {
  const { t } = useLanguage();
  const cards = t.dataToAction.cards;

  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-center max-w-2xl mx-auto">
            {t.dataToAction.headline}
          </h2>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          <Reveal delay={0.05}>
            <div className="h-full rounded-2xl glass p-7 flex flex-col hover:border-border-strong transition-colors">
              <span className="text-4xl font-semibold text-gradient">{cards[0].n}</span>
              <h3 className="mt-4 text-lg font-medium text-white">{cards[0].title}</h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{cards[0].text}</p>
              <div className="mt-8 flex-1 flex items-end">
                <MiniGraph />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="h-full rounded-2xl glass p-7 flex flex-col hover:border-border-strong transition-colors">
              <span className="text-4xl font-semibold text-gradient">{cards[1].n}</span>
              <h3 className="mt-4 text-lg font-medium text-white">{cards[1].title}</h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{cards[1].text}</p>
              <div className="mt-8 flex-1 flex items-center">
                <Chain items={cards[1].chain} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="h-full rounded-2xl glass p-7 flex flex-col hover:border-border-strong transition-colors lg:col-span-1 md:col-span-2">
              <span className="text-4xl font-semibold text-gradient">{cards[2].n}</span>
              <h3 className="mt-4 text-lg font-medium text-white">{cards[2].title}</h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{cards[2].text}</p>
              <div className="mt-6">
                <DecisionCard card={cards[2].card} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MiniGraph() {
  const points = "0,38 14,30 28,33 42,20 56,24 70,10 84,16 100,4";
  return (
    <svg viewBox="0 0 100 40" className="w-full h-16" aria-hidden="true">
      <defs>
        <linearGradient id="miniGraphGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke="url(#miniGraphGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: 0 }}
        className="animate-shimmer"
      />
    </svg>
  );
}

function Chain({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-2">
          <span className="rounded-full border border-border-soft px-3 py-1.5 text-xs text-text-secondary">{item}</span>
          {i < items.length - 1 && <span className="text-cyan/70 text-sm">→</span>}
        </span>
      ))}
    </div>
  );
}

function DecisionCard({ card }: { card: Record<string, string> }) {
  return (
    <div className="rounded-xl border border-border-strong bg-navy/60 p-5 space-y-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] uppercase text-text-muted">{card.priority}</span>
        <span className="text-[11px] font-medium rounded-full px-2.5 py-1 bg-purple/15 text-purple border border-purple/30">
          {card.priorityValue}
        </span>
      </div>
      <div>
        <div className="text-[10px] tracking-[0.15em] uppercase text-text-muted">{card.observation}</div>
        <div className="mt-1 text-sm text-white">{card.observationValue}</div>
      </div>
      <div>
        <div className="text-[10px] tracking-[0.15em] uppercase text-text-muted">{card.cause}</div>
        <div className="mt-1 text-sm text-text-secondary">{card.causeValue}</div>
      </div>
      <div>
        <div className="text-[10px] tracking-[0.15em] uppercase text-text-muted">{card.recommendation}</div>
        <div className="mt-1 text-sm text-text-secondary">{card.recommendationValue}</div>
      </div>
      <div className="pt-1">
        <div className="flex items-center justify-between text-[10px] tracking-[0.15em] uppercase text-text-muted mb-1.5">
          <span>{card.confidence}</span>
          <span className="text-white font-medium">87%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full w-[87%] rounded-full bg-[image:var(--gradient-brand)]" />
        </div>
      </div>
    </div>
  );
}
