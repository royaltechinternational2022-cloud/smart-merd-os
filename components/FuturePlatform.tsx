"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function FuturePlatform() {
  const { t } = useLanguage();

  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{t.future.headline}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-text-secondary leading-relaxed max-w-2xl mx-auto">{t.future.text}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 overflow-x-auto">
            <div className="flex items-center justify-center gap-2 min-w-max px-2 mx-auto">
              {t.future.steps.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`rounded-xl px-4 sm:px-5 py-3 text-[11px] sm:text-xs font-semibold tracking-wide whitespace-nowrap ${
                      i === 0
                        ? "bg-[image:var(--gradient-brand)] text-white"
                        : "border border-border-soft text-text-secondary"
                    }`}
                  >
                    {step}
                  </div>
                  {i < t.future.steps.length - 1 && <span className="text-border-strong">→</span>}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <div className="w-full max-w-3xl h-px bg-linear-to-r from-transparent via-violet/50 to-transparent" />
            </div>

            <div className="mt-6 flex justify-center">
              <div className="rounded-full glass px-6 py-2.5 text-[11px] sm:text-xs text-text-secondary tracking-wide">
                {t.future.layerLabel}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
