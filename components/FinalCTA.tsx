"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { requestDemo } from "@/lib/demo";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="relative py-32 sm:py-44 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(59,130,246,0.18) 0%, transparent 70%)",
          }}
        />
        <svg viewBox="0 0 100 20" className="absolute bottom-0 left-0 w-full h-32 opacity-40" preserveAspectRatio="none">
          <path d="M0 10 Q 25 0 50 10 T 100 10 V20 H0 Z" fill="url(#ctaWave)" />
          <defs>
            <linearGradient id="ctaWave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.25" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <Image src="/logo-icon.png" alt="Smart Merd OS" width={64} height={64} className="mx-auto" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
            <span className="block text-white">{t.finalCta.line1}</span>
            <span className="block text-gradient">{t.finalCta.line2}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 text-text-secondary max-w-lg mx-auto leading-relaxed">{t.finalCta.sub}</p>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={requestDemo}
              className="rounded-full px-7 py-3.5 text-sm font-medium text-white bg-[image:var(--gradient-brand)] hover:opacity-90 transition-all hover:scale-[1.02] shadow-[var(--shadow-glow-sm)]"
            >
              {t.finalCta.ctaPrimary}
            </button>
            <a
              href="#kontakt"
              className="rounded-full px-7 py-3.5 text-sm font-medium text-white border border-border-strong hover:bg-white/5 transition-colors"
            >
              {t.finalCta.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
