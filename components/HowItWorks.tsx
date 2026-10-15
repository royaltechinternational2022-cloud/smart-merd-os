"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeader, Tag } from "./ui";
import { InterfaceMockup } from "./ProductPreview";

type Step = {
  title: string;
  text: string;
  chips?: readonly string[];
  effect?: string;
  cause?: string;
  priority?: string;
  priorityValue?: string;
  suggestion?: string;
  actions?: readonly string[];
};

function StepVisual({ i, s }: { i: number; s: Step }) {
  const box = "rounded-xl border border-border-soft bg-navy/60 p-3.5";
  if (i === 0) {
    return (
      <div className={`${box} flex flex-wrap gap-1.5`}>
        {s.chips!.map((c) => (
          <span key={c} className="rounded-full border border-border-soft px-2.5 py-1 text-[11px] text-text-secondary">
            {c}
          </span>
        ))}
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className={`${box} space-y-2 text-[11px]`}>
        <div className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-2.5 py-1.5 text-amber-300">{s.effect}</div>
        <div className="text-center text-text-muted leading-none" aria-hidden="true">↑</div>
        <div className="rounded-lg border border-border-strong px-2.5 py-1.5 text-text-secondary">{s.cause}</div>
      </div>
    );
  }
  if (i === 2) {
    return (
      <div className={`${box} space-y-2`}>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-text-muted uppercase tracking-[0.1em] text-[10px]">{s.priority}</span>
          <span className="rounded-full bg-purple/15 border border-purple/30 text-purple px-2 py-0.5 font-medium">{s.priorityValue}</span>
        </div>
        <div className="text-xs text-white leading-snug">{s.suggestion}</div>
      </div>
    );
  }
  return (
    <div className={`${box} flex gap-1.5`}>
      {s.actions!.map((a, k) => (
        <span
          key={a}
          className={`flex-1 text-center rounded-lg px-1.5 py-1.5 text-[11px] font-medium border ${
            k === 0 ? "bg-[image:var(--gradient-brand)] border-transparent text-white" : "border-border-strong text-text-secondary"
          }`}
        >
          {a}
        </span>
      ))}
    </div>
  );
}

export function HowItWorks() {
  const { t } = useLanguage();
  const steps = t.how.steps as readonly Step[];

  return (
    <section id="how" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t.how.eyebrow} title={t.how.headline} />

        <div className="mt-6 flex justify-center">
          <Reveal delay={0.15}>
            <Tag kind="illustrative">{t.how.scenarioLabel}</Tag>
          </Reveal>
        </div>

        {/* Production data → Analysis → Recommendation → Operator decision */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <div className="relative h-full rounded-2xl glass p-5 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[image:var(--gradient-brand)] text-white text-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">{s.text}</p>
                <div className="mt-5 flex-1 flex items-end">
                  <div className="w-full">
                    <StepVisual i={i} s={s} />
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <span
                    className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-void border border-border-strong items-center justify-center text-cyan text-xs"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* The platform interface */}
        <Reveal delay={0.1}>
          <div className="mt-14">
            <InterfaceMockup />
            <p className="mt-3 text-center text-[10px] tracking-[0.1em] uppercase text-text-muted">{t.tags.mockup}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
