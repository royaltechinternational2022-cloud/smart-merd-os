"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Statement() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 sm:py-44 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[image:var(--gradient-radial-glow)] opacity-60" />
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-violet/30 animate-float-slow"
            style={{
              width: 3,
              height: 3,
              left: `${(i * 43) % 100}%`,
              top: `${(i * 29) % 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${7 + (i % 4)}s`,
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-2xl sm:text-4xl font-medium text-text-secondary leading-snug">{t.statement.line1}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-2xl sm:text-4xl font-semibold text-white leading-snug">
            {t.statement.line2}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
