"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeader, Tag } from "./ui";

/** Dedicated technology section: architecture + the three engines. Kept out of the homepage story. */
export function Technology() {
  const { t } = useLanguage();
  const tech = t.technology;

  return (
    <section id="technology" className="section">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow={tech.eyebrow} title={tech.headline} sub={tech.text} />

        <Reveal delay={0.15}>
          <div className="mt-14 rounded-3xl glass p-6 sm:p-10">
            <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center">
              {/* existing systems */}
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3 text-center md:text-left">
                  {tech.existingLabel}
                </div>
                <div className="flex flex-wrap md:flex-col gap-2 justify-center">
                  {tech.existing.map((item) => (
                    <span key={item} className="rounded-xl border border-border-soft bg-navy/50 px-4 py-2.5 text-xs text-text-secondary text-center">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <span className="text-cyan text-xl text-center rotate-90 md:rotate-0" aria-hidden="true">→</span>

              {/* hub */}
              <div className="flex justify-center">
                <div className="rounded-2xl glass-strong px-8 py-6 shadow-[0_0_50px_rgba(124,92,252,0.3)] text-center">
                  <span className="text-sm sm:text-base font-semibold text-gradient tracking-[0.15em]">{tech.hub}</span>
                </div>
              </div>

              <span className="text-cyan text-xl text-center rotate-90 md:rotate-0" aria-hidden="true">→</span>

              {/* outputs */}
              <div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3 text-center md:text-left">
                  {tech.outputLabel}
                </div>
                <div className="flex flex-wrap md:flex-col gap-2 justify-center">
                  {tech.outputs.map((item) => (
                    <span
                      key={item}
                      className="rounded-xl border border-border-strong bg-[image:var(--gradient-brand-soft)] px-4 py-2.5 text-xs font-medium text-white text-center"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Engines */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {tech.engines.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.08} className="h-full">
              <div className="h-full rounded-2xl glass p-6">
                <Tag kind="inDevelopment">{t.tags.inDevelopment}</Tag>
                <h3 className="mt-4 text-base font-semibold text-white">{e.name}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{e.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {tech.principles.map((p) => (
              <span key={p} className="rounded-full border border-border-strong px-4 py-2 text-xs font-medium text-white">
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
