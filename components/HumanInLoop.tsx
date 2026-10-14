"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function HumanInLoop() {
  const { t } = useLanguage();

  return (
    <section id="om" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{t.human.headline}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-text-secondary leading-relaxed max-w-2xl mx-auto">{t.human.p1}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-3 text-text-secondary leading-relaxed max-w-2xl mx-auto">{t.human.p2}</p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-14 space-y-2">
            <p className="text-2xl sm:text-3xl font-semibold text-white">{t.human.statement1}</p>
            <p className="text-2xl sm:text-3xl font-semibold text-gradient">{t.human.statement2}</p>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-16 flex flex-col items-center gap-3">
            {t.human.flow.map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <span
                  className={`rounded-full px-6 py-2.5 text-sm font-medium border ${
                    i === 1
                      ? "bg-[image:var(--gradient-brand)] text-white border-transparent"
                      : "border-border-soft text-text-secondary"
                  }`}
                >
                  {step}
                </span>
                {i < t.human.flow.length - 1 && (
                  <span className="w-px h-8 bg-linear-to-b from-cyan/60 to-violet/60" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
