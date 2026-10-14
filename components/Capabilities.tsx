"use client";

import { useLanguage } from "@/lib/i18n";
import { Reveal, RevealGroup, revealItem } from "./Reveal";
import { motion } from "framer-motion";

const icons = [
  // Samle / Collect
  <path key="1" d="M4 7l8-4 8 4-8 4-8-4Zm0 5l8 4 8-4M4 12l8 4 8-4" strokeLinecap="round" strokeLinejoin="round" />,
  // Oppdage / Detect
  <path key="2" d="M11 19a8 8 0 1 1 5.3-14M21 21l-4.3-4.3M11 7v4l3 2" strokeLinecap="round" strokeLinejoin="round" />,
  // Forklare / Explain
  <path key="3" d="M12 18h.01M9.5 9a2.5 2.5 0 1 1 3.4 2.3c-.9.4-1.4 1-1.4 1.9v.3M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" strokeLinecap="round" strokeLinejoin="round" />,
  // Lære / Learn
  <path key="4" d="M4 6l8-3 8 3-8 3-8-3Zm0 0v6c0 2 3.5 4 8 4s8-2 8-4V6" strokeLinecap="round" strokeLinejoin="round" />,
  // Prioritere / Prioritize
  <path key="5" d="M6 20V10M12 20V4M18 20v-7" strokeLinecap="round" strokeLinejoin="round" />,
  // Beslutte / Decide
  <path key="6" d="M9 12l2 2 4-4M12 3a9 9 0 1 0 9 9" strokeLinecap="round" strokeLinejoin="round" />,
];

export function Capabilities() {
  const { t } = useLanguage();

  return (
    <section id="plattform" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-center max-w-2xl mx-auto">
            {t.capabilities.headline}
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.capabilities.items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={revealItem}
              className="group rounded-2xl glass p-7 hover:border-border-strong hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-navy-soft border border-border-soft flex items-center justify-center text-cyan group-hover:text-white group-hover:bg-[image:var(--gradient-brand)] transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {icons[i]}
                </svg>
              </div>
              <h3 className="mt-5 text-sm font-semibold tracking-[0.1em] text-white">{item.title}</h3>
              <p className="mt-2.5 text-sm text-text-secondary leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
