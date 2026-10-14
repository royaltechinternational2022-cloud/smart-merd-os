"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { requestDemo } from "@/lib/demo";
import { Reveal } from "./Reveal";

const BADGE_POS = [
  { x: 12, y: 22 },
  { x: 86, y: 20 },
  { x: 6, y: 58 },
  { x: 92, y: 60 },
  { x: 22, y: 86 },
  { x: 76, y: 88 },
];

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: px * 10, y: py * 10 });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-void" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(59,130,246,0.16) 0%, transparent 70%), radial-gradient(40% 40% at 80% 70%, rgba(124,92,252,0.14) 0%, transparent 70%), linear-gradient(180deg, #05070d 0%, #070a13 60%, #05070d 100%)",
          }}
        />
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cyan/40 animate-float-slow"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 0.7}s`,
              animationDuration: `${6 + (i % 5)}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl w-full px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-cyan/90 border border-border-soft rounded-full px-4 py-1.5 glass">
              {t.hero.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.08] tracking-tight text-white">
              {t.hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg text-text-secondary max-w-lg leading-relaxed">{t.hero.sub}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={requestDemo}
                className="rounded-full px-7 py-3.5 text-sm font-medium text-white bg-[image:var(--gradient-brand)] hover:opacity-90 transition-all hover:scale-[1.02] shadow-[var(--shadow-glow-sm)]"
              >
                {t.hero.ctaPrimary}
              </button>
              <a
                href="#hvordan"
                className="rounded-full px-7 py-3.5 text-sm font-medium text-white border border-border-strong hover:bg-white/5 transition-colors"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-14 flex items-center gap-2 text-xs tracking-[0.15em] text-text-muted uppercase flex-wrap">
              {t.hero.flow.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className={i === t.hero.flow.length - 1 ? "text-gradient font-semibold" : ""}>{step}</span>
                  {i < t.hero.flow.length - 1 && <span className="text-border-strong">→</span>}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Visualization */}
        <div
          ref={ref}
          className="relative aspect-square w-full max-w-[520px] mx-auto select-none"
          style={{ perspective: 800 }}
        >
          <div
            className="relative w-full h-full transition-transform duration-300 ease-out"
            style={{ transform: `rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)` }}
          >
            <CageVisualization />

            {/* Connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {BADGE_POS.map((p, i) => (
                <line
                  key={i}
                  x1={50}
                  y1={50}
                  x2={p.x}
                  y2={p.y}
                  stroke="url(#heroLineGrad)"
                  strokeWidth={0.3}
                  className="animate-dash-flow"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              ))}
              <defs>
                <linearGradient id="heroLineGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.15" />
                </linearGradient>
              </defs>
            </svg>

            {/* Data point badges */}
            {BADGE_POS.map((p, i) => (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 animate-drift"
                style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${i * 0.5}s` }}
              >
                <div className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-[11px] font-medium text-white whitespace-nowrap shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[image:var(--gradient-brand)] animate-pulse-soft" />
                  {t.hero.dataPoints[i]}
                </div>
              </div>
            ))}

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="glass-strong rounded-2xl px-4 py-2.5 text-center shadow-[0_0_40px_rgba(124,92,252,0.35)]">
                <div className="text-[10px] tracking-[0.15em] font-semibold text-gradient">{t.hero.hub}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 flex flex-col items-center gap-2 text-text-muted" aria-hidden="true">
        <span className="text-[10px] tracking-[0.2em] uppercase">{t.hero.scrollHint}</span>
        <span className="w-px h-8 bg-linear-to-b from-cyan to-transparent" />
      </div>
    </section>
  );
}

function CageVisualization() {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1a33" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#03060d" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="cageGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* underwater volume */}
      <rect x="0" y="190" width="400" height="210" fill="url(#waterGrad)" />
      {/* waterline */}
      <line x1="20" y1="190" x2="380" y2="190" stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="1" />

      {/* cage ring above water */}
      <ellipse cx="200" cy="185" rx="150" ry="34" fill="none" stroke="url(#cageGrad)" strokeWidth="3" />
      <ellipse cx="200" cy="185" rx="150" ry="34" fill="none" stroke="url(#cageGrad)" strokeWidth="3" strokeOpacity="0.25" transform="translate(0,-6)" />

      {/* net going down, cone shape */}
      <path
        d="M 60 188 Q 90 320 200 355 Q 310 320 340 188"
        fill="none"
        stroke="url(#cageGrad)"
        strokeOpacity="0.55"
        strokeWidth="1.4"
      />
      <path
        d="M 90 186 Q 115 300 200 335 Q 285 300 310 186"
        fill="none"
        stroke="url(#cageGrad)"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      <path
        d="M 130 184 Q 150 270 200 300 Q 250 270 270 184"
        fill="none"
        stroke="url(#cageGrad)"
        strokeOpacity="0.25"
        strokeWidth="1"
      />

      {/* horizontal net rings underwater */}
      <ellipse cx="200" cy="230" rx="126" ry="24" fill="none" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1" />
      <ellipse cx="200" cy="275" rx="98" ry="18" fill="none" stroke="#7c5cfc" strokeOpacity="0.28" strokeWidth="1" />

      {/* fish */}
      {[
        { d: "M0,0 q10,-6 20,0 q-10,6 -20,0 Z", x: 150, y: 240, scale: 1, dur: "16s", delay: "0s" },
        { d: "M0,0 q10,-6 20,0 q-10,6 -20,0 Z", x: 230, y: 260, scale: 0.8, dur: "13s", delay: "2s" },
        { d: "M0,0 q10,-6 20,0 q-10,6 -20,0 Z", x: 190, y: 210, scale: 0.65, dur: "18s", delay: "4s" },
      ].map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y}) scale(${f.scale})`} className="animate-swim" style={{ animationDuration: f.dur, animationDelay: f.delay, transformOrigin: "center" }}>
          <path d={f.d} fill="#8ecbff" fillOpacity="0.55" />
        </g>
      ))}

      {/* buoy accents above water */}
      <circle cx="60" cy="172" r="6" fill="url(#cageGrad)" fillOpacity="0.8" />
      <circle cx="340" cy="172" r="6" fill="url(#cageGrad)" fillOpacity="0.8" />
    </svg>
  );
}
