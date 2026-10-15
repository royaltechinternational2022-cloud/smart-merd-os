"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { requestContact, TOPIC } from "@/lib/demo";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="section overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(59,130,246,0.18) 0%, transparent 70%)" }}
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
          <Image src="/logo-icon.png" alt="Smart Merd" width={56} height={56} className="mx-auto" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-7 h-section text-gradient">{t.finalCta.headline}</h2>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 text-text-secondary max-w-lg mx-auto leading-relaxed">{t.finalCta.sub}</p>
        </Reveal>
        <Reveal delay={0.26}>
          <div className="mt-9 flex justify-center">
            <button
              onClick={() => requestContact(TOPIC.pilot)}
              className="rounded-full px-8 py-3.5 text-sm font-medium text-white bg-[image:var(--gradient-brand)] hover:opacity-90 transition-all hover:scale-[1.02] shadow-[var(--shadow-glow-sm)]"
            >
              {t.finalCta.ctaPrimary}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
