"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { CONTACT_EVENT, requestContact } from "@/lib/demo";
import { SectionHeader } from "./ui";

type FormState = {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  topicIndex: number;
  message: string;
  consent: boolean;
  website: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm: FormState = {
  name: "",
  company: "",
  position: "",
  email: "",
  phone: "",
  topicIndex: 0,
  message: "",
  consent: false,
  website: "",
};

export function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const idx = (e as CustomEvent<number>).detail;
      if (typeof idx === "number") setForm((f) => ({ ...f, topicIndex: idx }));
    };
    window.addEventListener(CONTACT_EVENT, onSelect);
    return () => window.removeEventListener(CONTACT_EVENT, onSelect);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = t.contact.errors.required;
    if (!form.company.trim()) next.company = t.contact.errors.required;
    if (!form.email.trim()) next.email = t.contact.errors.required;
    else if (!EMAIL_RE.test(form.email.trim())) next.email = t.contact.errors.email;
    if (!form.consent) next.consent = t.contact.errors.consent;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          topic: t.contact.topics[form.topicIndex],
          startedAt: startedAt.current,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="contact" className="section">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <div className="rounded-3xl glass-strong p-10 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-[image:var(--gradient-brand)] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-6 text-lg text-white font-medium">{t.contact.success}</p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t.contact.eyebrow} title={t.contact.headline} />

        {/* Who are you? Pilot customers first: it is the primary call to action. */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.contact.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="h-full">
              <div
                className={`h-full rounded-2xl p-6 flex flex-col ${
                  c.primary ? "glass-strong gradient-border shadow-[var(--shadow-glow-sm)]" : "glass"
                }`}
              >
                <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed flex-1">{c.text}</p>
                <button
                  type="button"
                  onClick={() => requestContact(i)}
                  className={`mt-6 rounded-full px-5 py-3 text-sm font-medium text-white transition-all ${
                    c.primary
                      ? "bg-[image:var(--gradient-brand)] hover:opacity-90 shadow-[var(--shadow-glow-sm)]"
                      : "border border-border-strong hover:bg-white/5"
                  }`}
                >
                  {c.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="mx-auto max-w-2xl mt-10 rounded-3xl glass-strong p-6 sm:p-9 space-y-5">
            {/* Honeypot field, hidden from real users */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label={t.contact.fields.name}
                required
                error={errors.name}
                value={form.name}
                onChange={(v) => update("name", v)}
                autoComplete="name"
              />
              <Field
                label={t.contact.fields.company}
                required
                error={errors.company}
                value={form.company}
                onChange={(v) => update("company", v)}
                autoComplete="organization"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label={t.contact.fields.position}
                optionalLabel={t.contact.optional}
                value={form.position}
                onChange={(v) => update("position", v)}
                autoComplete="organization-title"
              />
              <Field
                label={t.contact.fields.email}
                required
                type="email"
                error={errors.email}
                value={form.email}
                onChange={(v) => update("email", v)}
                autoComplete="email"
              />
            </div>

            <Field
              label={t.contact.fields.phone}
              optionalLabel={t.contact.optional}
              type="tel"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              autoComplete="tel"
            />

            <div>
              <label htmlFor="topic" className="block text-xs font-medium text-text-secondary mb-2">
                {t.contact.fields.topic}
              </label>
              <select
                id="topic"
                value={form.topicIndex}
                onChange={(e) => update("topicIndex", Number(e.target.value))}
                className="w-full rounded-xl bg-navy/60 border border-border-soft px-4 py-3 text-sm text-white focus:border-cyan focus:ring-1 focus:ring-cyan/50 outline-none transition-colors appearance-none"
              >
                {t.contact.topics.map((topic, i) => (
                  <option key={topic} value={i} className="bg-navy text-white">
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium text-text-secondary mb-2">
                {t.contact.fields.message}
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full rounded-xl bg-navy/60 border border-border-soft px-4 py-3 text-sm text-white placeholder:text-text-muted focus:border-cyan focus:ring-1 focus:ring-cyan/50 outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-border-strong bg-navy accent-blue"
                />
                <span className="text-xs text-text-secondary leading-relaxed">{t.contact.consent}</span>
              </label>
              {errors.consent && <p className="mt-1.5 text-xs text-amber-400">{errors.consent}</p>}
            </div>

            {status === "error" && <p className="text-sm text-amber-400">{t.contact.error}</p>}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-full px-6 py-3.5 text-sm font-medium text-white bg-[image:var(--gradient-brand)] hover:opacity-90 transition-opacity shadow-[var(--shadow-glow-sm)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? t.contact.submitting : t.contact.submit}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  optionalLabel,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  optionalLabel?: string;
  type?: string;
  autoComplete?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-text-secondary mb-2">
        {label} {required && <span className="text-cyan">*</span>}
        {optionalLabel && <span className="text-text-muted"> ({optionalLabel})</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl bg-navy/60 border px-4 py-3 text-sm text-white placeholder:text-text-muted outline-none transition-colors focus:ring-1 ${
          error ? "border-amber-400/60 focus:border-amber-400 focus:ring-amber-400/40" : "border-border-soft focus:border-cyan focus:ring-cyan/50"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-amber-400">
          {error}
        </p>
      )}
    </div>
  );
}
