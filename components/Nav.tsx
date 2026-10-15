"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { requestContact, TOPIC } from "@/lib/demo";

const sections = [
  { key: "modes", href: "#modes" },
  { key: "how", href: "#how" },
  { key: "feeding", href: "#feeding" },
  { key: "status", href: "#status" },
  { key: "technology", href: "#technology" },
] as const;

export function Nav() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeAnd = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label={t.nav.aria}
        className={`w-full max-w-6xl rounded-2xl transition-all duration-500 ${
          scrolled ? "glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.35)]" : "bg-transparent border border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <a href="#top" className="flex items-center gap-2 shrink-0" aria-label={t.nav.home}>
            <Image src="/logo-icon.png" alt="Smart Merd" width={32} height={32} priority />
            <span className="font-semibold tracking-tight text-sm sm:text-base text-white">
              Smart Merd
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {sections.map((s) => (
              <a
                key={s.key}
                href={s.href}
                className="text-sm text-text-secondary hover:text-white transition-colors"
              >
                {t.nav[s.key]}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <LangSwitch lang={lang} setLang={setLang} label={t.nav.langLabel} />
            <button
              onClick={() => requestContact(TOPIC.pilot)}
              className="rounded-full px-5 py-2 text-sm font-medium text-white bg-[image:var(--gradient-brand)] hover:opacity-90 transition-opacity shadow-[var(--shadow-glow-sm)]"
            >
              {t.nav.cta}
            </button>
          </div>

          <button
            className="lg:hidden text-white p-2 -mr-2"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <div className="lg:hidden glass-strong rounded-b-2xl px-6 pb-6 pt-2 flex flex-col gap-1">
            {sections.map((s) => (
              <a
                key={s.key}
                href={s.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-text-secondary hover:text-white border-b border-border-soft"
              >
                {t.nav[s.key]}
              </a>
            ))}
            <div className="flex items-center justify-between pt-4">
              <LangSwitch lang={lang} setLang={setLang} label={t.nav.langLabel} />
            </div>
            <button
              onClick={() => closeAnd(() => requestContact(TOPIC.pilot))}
              className="mt-4 rounded-full px-5 py-3 text-sm font-medium text-white bg-[image:var(--gradient-brand)] text-center"
            >
              {t.nav.cta}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

function LangSwitch({
  lang,
  setLang,
  label,
}: {
  lang: "no" | "en";
  setLang: (l: "no" | "en") => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex items-center rounded-full border border-border-soft text-xs font-medium overflow-hidden">
      <button
        onClick={() => setLang("no")}
        aria-pressed={lang === "no"}
        className={`px-3 py-1.5 transition-colors ${lang === "no" ? "bg-white/10 text-white" : "text-text-muted hover:text-white"}`}
      >
        NO
      </button>
      <span className="w-px h-4 bg-border-soft" aria-hidden="true" />
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-white/10 text-white" : "text-text-muted hover:text-white"}`}
      >
        EN
      </button>
    </div>
  );
}
