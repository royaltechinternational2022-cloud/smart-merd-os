"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t, lang, setLang } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { label: t.footer.links.modes, href: "#modes" },
    { label: t.footer.links.feeding, href: "#feeding" },
    { label: t.footer.links.technology, href: "#technology" },
    { label: t.footer.links.contact, href: "#contact" },
  ];

  return (
    <footer className="relative border-t border-border-soft">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <Image src="/logo-icon.png" alt="Smart Merd" width={28} height={28} />
              <span className="font-semibold text-white">
                Smart Merd
              </span>
            </div>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <nav aria-label="Footer" className="flex flex-col gap-2.5">
              {links.map((l) => (
                <a key={l.label} href={l.href} className="text-sm text-text-secondary hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5">
              <span className="text-sm text-text-secondary">{t.footer.links.privacy}</span>
              <span className="text-sm text-text-secondary">{t.footer.links.cookies}</span>
            </div>
          </div>

          <div className="flex items-start">
            <div role="group" aria-label={t.nav.langLabel} className="flex items-center rounded-full border border-border-soft text-xs font-medium overflow-hidden">
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
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border-soft flex flex-col sm:flex-row justify-between gap-3 text-xs text-text-muted">
          <span>© {year} Smart Merd. {t.footer.rights}</span>
          <span className="sm:text-right max-w-md">{t.footer.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
