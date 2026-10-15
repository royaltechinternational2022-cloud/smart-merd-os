"use client";

import { useLanguage } from "@/lib/i18n";
import { MODE_STYLE, type ModeKey } from "@/lib/modes";
import { Reveal } from "./Reveal";
import { SectionHeader, Tag } from "./ui";
import { HistoricMock, LiveMock, SimulationMock } from "./Mockups";

const MOCKS: Record<ModeKey, () => React.ReactNode> = {
  historic: () => <HistoricMock />,
  live: () => <LiveMock />,
  simulation: () => <SimulationMock />,
};

// Draft status per mode, see the Development status section. Confirm before launch.
const MODE_STATUS: Record<ModeKey, "inDevelopment" | "planned"> = {
  historic: "inDevelopment",
  live: "inDevelopment",
  simulation: "planned",
};

export function Modes() {
  const { t } = useLanguage();

  return (
    <section id="modes" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t.modes.eyebrow} title={t.modes.headline} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.modes.items.map((item, i) => {
            const key = item.key as ModeKey;
            const s = MODE_STYLE[key];
            return (
              <Reveal key={item.key} delay={i * 0.1} className="h-full">
                <article className={`h-full rounded-3xl border ${s.border} bg-panel/70 p-6 sm:p-7 flex flex-col`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase ${s.text}`}>
                      <span className={`w-2 h-2 rounded-full ${s.dot}`} aria-hidden="true" />
                      0{i + 1}
                    </span>
                    <Tag kind={MODE_STATUS[key]}>{t.tags[MODE_STATUS[key]]}</Tag>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.text}</p>
                  <div className="mt-6 flex-1 flex flex-col justify-end">
                    {MOCKS[key]()}
                    <p className="mt-3 text-[10px] tracking-[0.1em] uppercase text-text-muted">{t.tags.mockup}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
