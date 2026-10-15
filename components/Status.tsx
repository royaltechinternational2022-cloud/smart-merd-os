"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeader, Tag } from "./ui";

const KINDS = ["developed", "inDevelopment", "planned"] as const;

/**
 * Draft status content: the split between developed / in development / future
 * must be confirmed by the Smart Merd team before launch (see lib/i18n.tsx `status`).
 */
export function Status() {
  const { t } = useLanguage();

  return (
    <section id="status" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t.status.eyebrow} title={t.status.headline} />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.status.columns.map((col, i) => {
            const kind = KINDS[i];
            return (
              <Reveal key={col.key} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl glass p-6">
                  <Tag kind={kind}>{col.title}</Tag>
                  <ul className="mt-5 space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                            kind === "developed" ? "bg-emerald-400" : kind === "inDevelopment" ? "bg-cyan" : "bg-text-muted"
                          }`}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-xs text-text-muted max-w-2xl mx-auto leading-relaxed">{t.status.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
