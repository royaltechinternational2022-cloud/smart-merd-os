"use client";

import React, { createContext, useContext, useEffect, useMemo, useCallback, useSyncExternalStore } from "react";

export type Lang = "no" | "en";

/**
 * Both languages MUST keep exactly the same structure (same keys, same array lengths).
 * Terminology: "Smart Merd" = company/platform, "Smart Cage" = the product shown on the site.
 * No "OS" and no "™" anywhere.
 */
const dict = {
  no: {
    meta: {
      title: "Smart Merd | Smart Cage – beslutningsstøtte for havbruk",
      description:
        "Smart Cage fra Smart Merd analyserer produksjonsdata, overvåker driften i sanntid og simulerer mulige tiltak – før beslutningene tas. Første bruksområde: fôring.",
    },
    nav: {
      modes: "Tre moduser",
      how: "Slik fungerer det",
      feeding: "Fôring",
      status: "Status",
      technology: "Teknologi",
      contact: "Kontakt",
      cta: "Bli pilotpartner",
      langLabel: "Bytt språk",
      aria: "Hovednavigasjon",
      home: "Smart Merd forside",
      menuOpen: "Åpne meny",
      menuClose: "Lukk meny",
    },
    tags: {
      illustrative: "Illustrasjon",
      mockup: "Konseptskisse · illustrerende data",
      developed: "Utviklet",
      inDevelopment: "Under utvikling",
      planned: "Planlagt",
    },
    hero: {
      eyebrow: "SMART CAGE",
      line1: "Forstå fortiden.",
      line2: "Styr nåtiden.",
      line3: "Forbered fremtiden.",
      sub: "Én intelligent plattform som analyserer produksjonsdata, overvåker driften i sanntid og simulerer mulige tiltak – før beslutningene tas.",
      modes: [
        { key: "historic", label: "Historisk", text: "Lær av det som har skjedd." },
        { key: "live", label: "Live", text: "Forstå det som skjer nå." },
        { key: "simulation", label: "Simulering", text: "Utforsk det som kan skje." },
      ],
      ctaPrimary: "Bli pilotpartner",
      ctaSecondary: "Utforsk Smart Cage",
    },
    modes: {
      eyebrow: "Tre driftsmoduser",
      headline: "Én plattform. Tre måter å forstå driften på.",
      items: [
        {
          key: "historic",
          name: "Historisk intelligens",
          text: "Analyser historiske produksjonsdata for å finne mønstre, avvik og mulige årsaker.",
          mock: {
            title: "Fôrrespons · 12 uker",
            deviation: "Avvik",
            causeLabel: "Mulig årsak",
            cause: "Oksygenfall i uke 9",
          },
        },
        {
          key: "live",
          name: "Live-intelligens",
          text: "Følg dagens produksjonsforhold, se relevante endringer og få handlingsrettet beslutningsstøtte.",
          mock: {
            title: "Lokalitetsstatus · nå",
            rows: [
              { label: "Fôrrespons", value: "Redusert", level: "warn" },
              { label: "Oksygen", value: "Fallende", level: "warn" },
              { label: "Temperatur", value: "Stabil", level: "ok" },
            ],
            decisionLabel: "Beslutningsstøtte",
            decision: "Vurder å justere dagens fôringsplan",
          },
        },
        {
          key: "simulation",
          name: "Simuleringsintelligens",
          text: "Utforsk mulige utfall av ulike driftsbeslutninger før de gjennomføres.",
          mock: {
            title: "Scenarier · neste 48 t",
            scenarios: ["Behold planen", "Reduser rasjonen", "Pause i fôring"],
            outcomeLabel: "Simulert utfall (eksempel)",
          },
        },
      ],
    },
    how: {
      eyebrow: "Slik fungerer det",
      headline: "Fra produksjonsdata til operatørens beslutning",
      scenarioLabel: "Eksempel: fôringsscenario",
      steps: [
        { title: "Produksjonsdata", text: "Fôring, oksygen, temperatur og biomasse samlet.", chips: ["Fôring", "Oksygen", "Temperatur", "Biomasse"] },
        { title: "Analyse", text: "Avvik kobles til mulige årsaker.", effect: "Redusert fôrrespons", cause: "Fallende oksygen" },
        { title: "Anbefaling", text: "Prioritert forslag med begrunnelse.", priority: "Prioritet", priorityValue: "Høy", suggestion: "Vurder justert fôringsplan" },
        { title: "Operatørens beslutning", text: "Operatøren aksepterer, justerer eller avviser.", actions: ["Aksepter", "Juster", "Avvis"] },
      ],
      interface: {
        window: "Smart Cage – Lokalitet 4021",
        sidebar: ["Oversikt", "Historisk", "Live", "Simulering", "Fôring", "Miljø", "Observasjoner", "Beslutningsstøtte"],
        metrics: [
          { label: "Biomasse", value: "842 t", trend: "+1,2%" },
          { label: "Fôring siste 24 t", value: "6,4 t", trend: "-3,1%" },
          { label: "Temperatur", value: "9,8 °C", trend: "+0,4°" },
          { label: "Oksygennivå", value: "87%", trend: "-2,0%" },
        ],
        insightsLabel: "Innsikt",
        insightTitle: "Endring i fôrrespons oppdaget",
        factorsLabel: "Mulige påvirkningsfaktorer",
        factors: ["Miljøforhold", "Utvikling i fôring", "Historiske produksjonsmønstre"],
        recommendationLabel: "Anbefalt vurdering",
        recommendationValue: "Følg opp oksygennivå og vurder justert fôringsregime de neste 48 timene.",
        confidenceLabel: "Konfidens",
        confidenceNote: "Eksempel – ikke validert",
        decisionLabel: "Operatørens valg",
        decisions: ["Aksepter", "Juster", "Avvis"],
      },
    },
    feeding: {
      eyebrow: "Første bruksområde",
      headline: "Vi starter med fôring",
      text: "Fôring er et av de viktigste biologiske og økonomiske beslutningsområdene i havbruk. Smart Cage utvikles først for å forstå samspillet mellom fôring, miljø og produksjon.",
      variables: ["Fôring", "Temperatur", "Oksygen", "Biomasse", "Vekst"],
      states: [
        { key: "normal", label: "NORMAL UTVIKLING", text: "Alt innenfor forventet nivå." },
        { key: "change", label: "ENDRING OPPDAGET", text: "En meningsfull endring identifiseres." },
        { key: "action", label: "VURDER TILTAK", text: "Mulige tiltak vises for operatøren." },
      ],
      value: [
        { title: "Raskere oppdagelse", text: "Se endringer i fôrrespons tidligere." },
        { title: "Tydeligere årsaker", text: "Forstå hva som kan ligge bak." },
        { title: "Tryggere valg", text: "Vurder tiltak før de gjennomføres." },
      ],
      note: "Under utvikling sammen med pilotpartnere. Funksjonene er ikke validert i drift ennå.",
    },
    status: {
      eyebrow: "Utviklingsstatus",
      headline: "Hva som er utviklet, og hva som kommer",
      columns: [
        {
          key: "developed",
          title: "Utviklet",
          items: ["Produktkonsept og grensesnittdesign", "Plattformarkitektur (design)"],
        },
        {
          key: "inDevelopment",
          title: "Under utvikling",
          items: ["Historisk intelligens", "Live-intelligens", "Beslutningsstøtte for fôring"],
        },
        {
          key: "planned",
          title: "Fremtidig",
          items: ["Simuleringsintelligens", "Flere beslutningsområder: produksjon, miljø og biologi", "Validert konfidensberegning"],
        },
      ],
      note: "Tall, konfidensverdier og simulerte resultater på dette nettstedet er illustrasjoner, med mindre annet er oppgitt. Validering sammen med pilotpartnere er planlagt.",
    },
    technology: {
      eyebrow: "Teknologi",
      headline: "Et beslutningslag over eksisterende systemer",
      text: "Smart Merd erstatter ikke produksjonssystemer, sensorer eller fôringsløsninger. Plattformen kobles på og gjør dataene brukbare.",
      existingLabel: "Eksisterende systemer",
      existing: ["Produksjon", "Fôring", "Miljø", "Biologi", "Historikk"],
      hub: "SMART MERD",
      outputLabel: "Beslutningsgrunnlag",
      outputs: ["Forståelse", "Prioritering", "Handling"],
      engines: [
        { name: "Årsaksmotor", text: "Finner mulige årsaker ved å koble fôring, miljø og biologi." },
        { name: "Beslutningsmotor", text: "Rangerer mulige tiltak og viser begrunnelsen." },
        { name: "Konfidensmotor", text: "Viser hvor sikker hver anbefaling er." },
      ],
      principles: ["Forklarbar", "Leverandøruavhengig", "Mennesket bestemmer"],
    },
    contact: {
      eyebrow: "Kontakt",
      headline: "Hvordan vil du jobbe med oss?",
      cards: [
        {
          title: "Pilotkunder",
          text: "Test Smart Cage i din drift og påvirk hva vi bygger.",
          cta: "Bli pilotpartner",
          primary: true,
        },
        {
          title: "Teknologi- og forskningspartnere",
          text: "Samarbeid om data, metoder og validering.",
          cta: "Foreslå samarbeid",
          primary: false,
        },
        {
          title: "Generelle henvendelser",
          text: "Spørsmål om Smart Merd eller Smart Cage.",
          cta: "Send en melding",
          primary: false,
        },
      ],
      fields: {
        name: "Navn",
        company: "Bedrift",
        position: "Stilling",
        email: "E-post",
        phone: "Telefon",
        topic: "Hva gjelder henvendelsen?",
        message: "Melding",
      },
      optional: "Valgfritt",
      topics: ["Pilotpartner", "Teknologi- eller forskningspartner", "Generell henvendelse"],
      consent: "Jeg godtar at Smart Merd kan bruke opplysningene mine for å besvare henvendelsen.",
      submit: "Send forespørsel",
      submitting: "Sender...",
      success: "Takk for henvendelsen. Vi tar kontakt med deg så snart som mulig.",
      error: "Noe gikk galt. Sjekk feltene og prøv igjen.",
      errors: {
        required: "Dette feltet er påkrevd.",
        email: "Oppgi en gyldig e-postadresse.",
        consent: "Du må godta bruk av opplysningene for å sende inn skjemaet.",
      },
    },
    finalCta: {
      headline: "Vær med på å forme Smart Cage",
      sub: "Vi søker pilotpartnere i havbruksnæringen.",
      ctaPrimary: "Bli pilotpartner",
    },
    footer: {
      tagline: "Forstå fortiden. Styr nåtiden. Forbered fremtiden.",
      links: {
        modes: "Tre moduser",
        feeding: "Fôring",
        technology: "Teknologi",
        contact: "Kontakt",
        privacy: "Personvern",
        cookies: "Cookies",
      },
      rights: "Alle rettigheter forbeholdt.",
      disclaimer: "Grensesnitt, tall og simulerte resultater er illustrasjoner og ikke validerte data.",
    },
  },
  en: {
    meta: {
      title: "Smart Merd | Smart Cage – decision support for aquaculture",
      description:
        "Smart Cage by Smart Merd analyzes production data, monitors operations in real time and simulates possible measures – before decisions are made. First use case: feeding.",
    },
    nav: {
      modes: "Three modes",
      how: "How it works",
      feeding: "Feeding",
      status: "Status",
      technology: "Technology",
      contact: "Contact",
      cta: "Become a pilot partner",
      langLabel: "Switch language",
      aria: "Main navigation",
      home: "Smart Merd home",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    tags: {
      illustrative: "Illustrative",
      mockup: "Conceptual mockup · illustrative data",
      developed: "Developed",
      inDevelopment: "In development",
      planned: "Planned",
    },
    hero: {
      eyebrow: "SMART CAGE",
      line1: "Understanding the past.",
      line2: "Control the present.",
      line3: "Prepare for the future.",
      sub: "One intelligent platform that analyzes production data, monitors operations in real time and simulates possible measures – before decisions are made.",
      modes: [
        { key: "historic", label: "Historic", text: "Learn from what has happened." },
        { key: "live", label: "Live", text: "Understand what is happening now." },
        { key: "simulation", label: "Simulation", text: "Explore what might happen." },
      ],
      ctaPrimary: "Become a pilot partner",
      ctaSecondary: "Explore the Smart Cage",
    },
    modes: {
      eyebrow: "Three operating modes",
      headline: "One platform. Three ways to understand operations.",
      items: [
        {
          key: "historic",
          name: "Historical Intelligence",
          text: "Analyze historical production data to identify patterns, deviations and possible causes.",
          mock: {
            title: "Feed response · 12 weeks",
            deviation: "Deviation",
            causeLabel: "Possible cause",
            cause: "Oxygen dip in week 9",
          },
        },
        {
          key: "live",
          name: "Live Intelligence",
          text: "Monitor current production conditions, spot relevant changes and get actionable decision support.",
          mock: {
            title: "Site status · now",
            rows: [
              { label: "Feed response", value: "Reduced", level: "warn" },
              { label: "Oxygen", value: "Falling", level: "warn" },
              { label: "Temperature", value: "Stable", level: "ok" },
            ],
            decisionLabel: "Decision support",
            decision: "Consider adjusting today's feeding plan",
          },
        },
        {
          key: "simulation",
          name: "Simulation Intelligence",
          text: "Explore possible outcomes of different operational decisions before implementing them.",
          mock: {
            title: "Scenarios · next 48 h",
            scenarios: ["Keep the plan", "Reduce the ration", "Pause feeding"],
            outcomeLabel: "Simulated outcome (example)",
          },
        },
      ],
    },
    how: {
      eyebrow: "How it works",
      headline: "From production data to the operator's decision",
      scenarioLabel: "Example: feeding scenario",
      steps: [
        { title: "Production data", text: "Feeding, oxygen, temperature and biomass in one place.", chips: ["Feeding", "Oxygen", "Temperature", "Biomass"] },
        { title: "Analysis", text: "Deviations are linked to possible causes.", effect: "Reduced feed response", cause: "Falling oxygen" },
        { title: "Recommendation", text: "A prioritized suggestion with reasoning.", priority: "Priority", priorityValue: "High", suggestion: "Consider an adjusted feeding plan" },
        { title: "Operator decision", text: "The operator accepts, adjusts or rejects.", actions: ["Accept", "Adjust", "Dismiss"] },
      ],
      interface: {
        window: "Smart Cage – Site 4021",
        sidebar: ["Overview", "Historic", "Live", "Simulation", "Feeding", "Environment", "Observations", "Decision support"],
        metrics: [
          { label: "Biomass", value: "842 t", trend: "+1.2%" },
          { label: "Feeding last 24 h", value: "6.4 t", trend: "-3.1%" },
          { label: "Temperature", value: "9.8 °C", trend: "+0.4°" },
          { label: "Oxygen level", value: "87%", trend: "-2.0%" },
        ],
        insightsLabel: "Insights",
        insightTitle: "Change in feed response detected",
        factorsLabel: "Possible contributing factors",
        factors: ["Environmental conditions", "Feeding development", "Historical production patterns"],
        recommendationLabel: "Recommended assessment",
        recommendationValue: "Monitor oxygen levels and consider an adjusted feeding regime over the next 48 hours.",
        confidenceLabel: "Confidence",
        confidenceNote: "Example – not validated",
        decisionLabel: "Operator's choice",
        decisions: ["Accept", "Adjust", "Dismiss"],
      },
    },
    feeding: {
      eyebrow: "Initial use case",
      headline: "We start with feeding",
      text: "Feeding is one of the most important biological and economic decision areas in aquaculture. Smart Cage is first being developed to understand how feeding, environment and production interact.",
      variables: ["Feeding", "Temperature", "Oxygen", "Biomass", "Growth"],
      states: [
        { key: "normal", label: "NORMAL DEVELOPMENT", text: "Everything within expected levels." },
        { key: "change", label: "CHANGE DETECTED", text: "A meaningful change is identified." },
        { key: "action", label: "ASSESS ACTION", text: "Possible actions are shown to the operator." },
      ],
      value: [
        { title: "Faster detection", text: "See changes in feed response earlier." },
        { title: "Clearer causes", text: "Understand what may be behind them." },
        { title: "Safer choices", text: "Assess measures before acting." },
      ],
      note: "Being developed with pilot partners. The capabilities are not yet validated in operation.",
    },
    status: {
      eyebrow: "Development status",
      headline: "What is built, and what is coming",
      columns: [
        {
          key: "developed",
          title: "Developed",
          items: ["Product concept and interface design", "Platform architecture (design)"],
        },
        {
          key: "inDevelopment",
          title: "In development",
          items: ["Historical Intelligence", "Live Intelligence", "Feeding decision support"],
        },
        {
          key: "planned",
          title: "Future",
          items: ["Simulation Intelligence", "More decision areas: production, environment and biology", "Validated confidence scoring"],
        },
      ],
      note: "Figures, confidence values and simulated results on this site are illustrations unless stated otherwise. Validation with pilot partners is planned.",
    },
    technology: {
      eyebrow: "Technology",
      headline: "A decision layer above existing systems",
      text: "Smart Merd does not replace production systems, sensors or feeding solutions. The platform connects to them and makes the data usable.",
      existingLabel: "Existing systems",
      existing: ["Production", "Feeding", "Environment", "Biology", "History"],
      hub: "SMART MERD",
      outputLabel: "Decision basis",
      outputs: ["Understanding", "Prioritization", "Action"],
      engines: [
        { name: "Cause Engine", text: "Finds possible causes by linking feeding, environment and biology." },
        { name: "Decision Engine", text: "Ranks possible actions and shows the reasoning." },
        { name: "Confidence Engine", text: "Shows how certain each recommendation is." },
      ],
      principles: ["Explainable", "Vendor-independent", "The human decides"],
    },
    contact: {
      eyebrow: "Contact",
      headline: "How would you like to work with us?",
      cards: [
        {
          title: "Pilot customers",
          text: "Test Smart Cage in your operation and influence what we build.",
          cta: "Become a pilot partner",
          primary: true,
        },
        {
          title: "Technology and research partners",
          text: "Collaborate on data, methods and validation.",
          cta: "Propose a collaboration",
          primary: false,
        },
        {
          title: "General enquiries",
          text: "Questions about Smart Merd or Smart Cage.",
          cta: "Send a message",
          primary: false,
        },
      ],
      fields: {
        name: "Name",
        company: "Company",
        position: "Position",
        email: "Email",
        phone: "Phone",
        topic: "What is your enquiry about?",
        message: "Message",
      },
      optional: "Optional",
      topics: ["Pilot partner", "Technology or research partner", "General enquiry"],
      consent: "I agree that Smart Merd can use my information to respond to my inquiry.",
      submit: "Send request",
      submitting: "Sending...",
      success: "Thank you for contacting us. We will get back to you shortly.",
      error: "Something went wrong. Please check the fields and try again.",
      errors: {
        required: "This field is required.",
        email: "Please enter a valid email address.",
        consent: "You must accept the use of your information to submit the form.",
      },
    },
    finalCta: {
      headline: "Help shape Smart Cage",
      sub: "We are looking for pilot partners in aquaculture.",
      ctaPrimary: "Become a pilot partner",
    },
    footer: {
      tagline: "Understanding the past. Control the present. Prepare for the future.",
      links: {
        modes: "Three modes",
        feeding: "Feeding",
        technology: "Technology",
        contact: "Contact",
        privacy: "Privacy",
        cookies: "Cookies",
      },
      rights: "All rights reserved.",
      disclaimer: "Interface, figures and simulated results are illustrations, not validated data.",
    },
  },
} as const;

export type Dict = (typeof dict)[Lang];

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
} | null>(null);

const STORAGE_KEY = "smartmerd-lang";
let currentLang: Lang = "no";
let hydratedFromStorage = false;
const listeners = new Set<() => void>();

function getSnapshot(): Lang {
  if (!hydratedFromStorage) {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "no" || stored === "en") currentLang = stored;
    hydratedFromStorage = true;
  }
  return currentLang;
}

function getServerSnapshot(): Lang {
  return "no";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function writeLang(l: Lang) {
  currentLang = l;
  window.localStorage.setItem(STORAGE_KEY, l);
  listeners.forEach((cb) => cb());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dict[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    writeLang(l);
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: dict[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
