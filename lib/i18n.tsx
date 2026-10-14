"use client";

import React, { createContext, useContext, useEffect, useMemo, useCallback, useSyncExternalStore } from "react";

export type Lang = "no" | "en";

const dict = {
  no: {
    meta: {
      title: "Smart Merd OS™ | Bedre beslutninger i havbruk",
      description:
        "Smart Merd OS™ samler og analyserer produksjons-, miljø- og biologiske data for å gi produksjonsledelsen bedre og mer forklarbar beslutningsstøtte i havbruk.",
    },
    nav: {
      platform: "Plattform",
      how: "Hvordan det fungerer",
      feeding: "Fôring",
      technology: "Teknologi",
      about: "Om Smart Merd",
      demo: "Be om demo",
      langLabel: "Bytt språk",
    },
    hero: {
      eyebrow: "Beslutningsstøtte for havbruk",
      headline: "Bedre beslutninger i havbruk",
      sub: "Smart Merd OS™ samler og analyserer produksjons-, miljø- og biologiske data og gjør informasjonen om til konkret og forklarbar beslutningsstøtte.",
      ctaPrimary: "Be om demo",
      ctaSecondary: "Oppdag Smart Merd",
      flow: ["HAVBRUK", "DATA", "FORSTÅELSE", "BESLUTNING"],
      dataPoints: ["Temperatur", "Oksygen", "Fôring", "Biomasse", "Vekst", "Miljø"],
      hub: "SMART MERD OS™",
      scrollHint: "Scroll",
    },
    problem: {
      headline: "Store mengder data. Ett vanskelig spørsmål: Hva bør vi gjøre nå?",
      p1: "Havbruksnæringen samler inn store mengder data fra produksjonssystemer, miljømålinger, fôring og biologiske observasjoner.",
      p2: "Likevel ligger informasjonen ofte spredt i ulike systemer, og mye av analysearbeidet gjøres fortsatt manuelt.",
      p3: "Produksjonsledelsen har som regel god oversikt over hva som har skjedd. Det krevende er å forstå hvorfor det skjedde, hva som bør prioriteres, og hvilke tiltak som bør vurderes.",
      highlight: "Det er dette Smart Merd skal løse.",
      sources: ["Produksjonssystem", "Miljøsensorer", "Fôringsdata", "Biologiske observasjoner", "Historikk"],
    },
    dataToAction: {
      headline: "Fra data til handling",
      cards: [
        {
          n: "01",
          title: "Hva skjer?",
          text: "Identifisere relevante endringer, avvik og utviklingstrekk i produksjonen.",
        },
        {
          n: "02",
          title: "Hvorfor skjer det?",
          text: "Analysere sammenhenger mellom flere datakilder og synliggjøre mulige årsaker.",
          chain: ["Fôring", "Miljø", "Biologi", "Produksjon"],
        },
        {
          n: "03",
          title: "Hva bør vi gjøre nå?",
          text: "Presentere prioriterte observasjoner og tiltak som gir et bedre grunnlag for neste beslutning.",
          card: {
            priority: "Prioritet",
            priorityValue: "Høy",
            observation: "Observasjon",
            observationValue: "Redusert fôrrespons siste 48 t",
            cause: "Mulig årsak",
            causeValue: "Fallende oksygennivå kombinert med temperaturendring",
            recommendation: "Anbefalt vurdering",
            recommendationValue: "Vurder justert fôringsplan og tett oppfølging av oksygennivå",
            confidence: "Konfidens",
          },
        },
      ],
    },
    statement: {
      line1: "Målet er ikke å gi oppdretteren flere grafer eller varsler.",
      line2: "Målet er å gjøre eksisterende informasjon enklere å forstå og bruke i den operative driften.",
    },
    intelligence: {
      headline: "Et beslutningslag over eksisterende systemer",
      p1: "Smart Merd skal ikke erstatte produksjonssystemene, sensorene eller fôringsløsningene oppdretteren allerede bruker.",
      p2: "Plattformen utvikles som et leverandøruavhengig beslutningslag over eksisterende systemer og datakilder.",
      existingLabel: "Eksisterende systemer",
      existing: ["Produksjonssystemer", "Fôringssystemer", "Miljøsensorer", "Biologiske observasjoner", "Historiske produksjonsdata"],
      hub: "SMART MERD OS™",
      outputLabel: "Beslutningsgrunnlag",
      outputs: ["Forståelse", "Prioritering", "Beslutningsstøtte", "Handling"],
    },
    capabilities: {
      headline: "Fra fragmenterte data til operativ forståelse",
      items: [
        { title: "SAMLE", text: "Samle og strukturere produksjons- og miljødata." },
        { title: "OPPDAGE", text: "Identifisere avvik, mønstre og sammenhenger." },
        { title: "FORKLARE", text: "Forklare hva som kan ha påvirket produksjonsutviklingen." },
        { title: "LÆRE", text: "Støtte læring mellom lokaliteter og utsett." },
        { title: "PRIORITERE", text: "Hjelpe produksjonsledelsen med å forstå hva som krever oppmerksomhet." },
        { title: "BESLUTTE", text: "Gi produksjonsledelsen et tydeligere og mer helhetlig beslutningsgrunnlag." },
      ],
    },
    feeding: {
      headline: "Vi starter med fôring",
      p1: "Fôring er et av de viktigste biologiske og økonomiske beslutningsområdene i havbruk.",
      p2: "Smart Merd fokuserer derfor først på sammenhengen mellom fôring, produksjonsutvikling og miljøforhold.",
      variables: ["Fôring", "Temperatur", "Oksygen", "Biomasse", "Vekst", "Produksjonsutvikling"],
      states: [
        {
          key: "normal",
          label: "NORMAL UTVIKLING",
          text: "Alt opererer innenfor forventede parametere.",
        },
        {
          key: "change",
          label: "ENDRING OPPDAGET",
          text: "Smart Merd identifiserer en meningsfull endring.",
        },
        {
          key: "action",
          label: "VURDER TILTAK",
          text: "Relevante observasjoner og mulige tiltak presenteres for produksjonsledelsen.",
        },
      ],
    },
    human: {
      headline: "Teknologien støtter mennesket",
      p1: "Smart Merd skal ikke overta ansvaret fra biologer, driftsledere eller produksjonssjefer.",
      p2: "Systemet skal gi dem bedre oversikt, raskere forståelse og et mer helhetlig grunnlag for å ta gode beslutninger.",
      statement1: "Mennesket tar beslutningen.",
      statement2: "Smart Merd gjør beslutningsgrunnlaget bedre.",
      flow: ["DATA", "SMART MERD OS™", "MENNESKET", "BESLUTNING"],
    },
    product: {
      headline: "Smart Merd OS™ i praksis",
      sub: "Et operativt beslutningsgrunnlag, ikke bare et dashboard.",
      sidebar: ["Oversikt", "Produksjon", "Fôring", "Miljø", "Biologi", "Observasjoner", "Beslutningsstøtte", "AI Assistant"],
      metrics: [
        { label: "Biomasse", value: "842 t", trend: "+1,2%" },
        { label: "Fôring siste 24 t", value: "6,4 t", trend: "-3,1%" },
        { label: "Temperatur", value: "9,8 °C", trend: "+0,4°" },
        { label: "Oksygennivå", value: "87%", trend: "-2,0%" },
        { label: "Veksttrend", value: "Stabil", trend: "" },
        { label: "Produksjonsstatus", value: "Normal", trend: "" },
      ],
      insightsLabel: "Smart Merd Insights",
      insightTitle: "Endring i fôrrespons oppdaget",
      factorsLabel: "Mulige påvirkningsfaktorer",
      factors: ["Miljøforhold", "Utvikling i fôring", "Historiske produksjonsmønstre"],
      recommendationLabel: "Anbefalt vurdering",
      recommendationValue: "Følg opp oksygennivå ved lokalitet og vurder justert fôringsregime de neste 48 timene.",
      confidenceLabel: "Confidence",
    },
    future: {
      headline: "Bygget for flere beslutningsområder",
      text: "Smart Merd starter med fôring, men plattformarkitekturen er utviklet for å støtte flere operative beslutningsområder over tid.",
      steps: ["FÔRING", "PRODUKSJON", "MILJØ", "BIOLOGI", "OPERASJONELL BESLUTNINGSSTØTTE"],
      layerLabel: "SMART MERD OS™ — beslutningslaget som knytter områdene sammen",
    },
    contact: {
      headline: "Vil du vite mer om Smart Merd OS™?",
      sub: "Ta kontakt med oss for en introduksjon til plattformen og hvordan Smart Merd kan brukes som beslutningsstøtte i moderne havbruk.",
      fields: {
        name: "Navn",
        company: "Bedrift",
        position: "Stilling",
        email: "E-post",
        phone: "Telefon",
        topic: "Hva ønsker du å vite mer om?",
        message: "Melding",
      },
      optional: "Valgfritt",
      topics: [
        "Smart Merd OS™",
        "Fôring og produksjonsanalyse",
        "Integrasjon med eksisterende systemer",
        "Pilot / samarbeid",
        "Demo",
        "Annet",
      ],
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
      demoTopic: "Demo",
    },
    finalCta: {
      line1: "Fra data til forståelse.",
      line2: "Fra forståelse til handling.",
      sub: "Smart Merd OS™ gir produksjonsledelsen et bedre grunnlag for neste beslutning.",
      ctaPrimary: "Be om demo",
      ctaSecondary: "Kontakt oss",
    },
    footer: {
      tagline: "Fra data til forståelse. Fra forståelse til handling.",
      links: {
        platform: "Plattform",
        technology: "Teknologi",
        about: "Om oss",
        contact: "Kontakt",
        privacy: "Personvern",
        cookies: "Cookies",
      },
      rights: "Alle rettigheter forbeholdt.",
    },
  },
  en: {
    meta: {
      title: "Smart Merd OS™ | Better decisions in aquaculture",
      description:
        "Smart Merd OS™ collects and analyzes production, environmental and biological data to give production management better, more explainable decision support in aquaculture.",
    },
    nav: {
      platform: "Platform",
      how: "How it works",
      feeding: "Feeding",
      technology: "Technology",
      about: "About Smart Merd",
      demo: "Request a demo",
      langLabel: "Switch language",
    },
    hero: {
      eyebrow: "Decision support for aquaculture",
      headline: "Better decisions in aquaculture",
      sub: "Smart Merd OS™ collects and analyzes production, environmental and biological data and turns the information into concrete, explainable decision support.",
      ctaPrimary: "Request a demo",
      ctaSecondary: "Discover Smart Merd",
      flow: ["AQUACULTURE", "DATA", "UNDERSTANDING", "DECISION"],
      dataPoints: ["Temperature", "Oxygen", "Feeding", "Biomass", "Growth", "Environment"],
      hub: "SMART MERD OS™",
      scrollHint: "Scroll",
    },
    problem: {
      headline: "Large volumes of data. One difficult question: what should we do now?",
      p1: "The aquaculture industry collects large volumes of data from production systems, environmental measurements, feeding and biological observations.",
      p2: "Yet the information is often scattered across different systems, and much of the analysis is still done manually.",
      p3: "Production management usually has good insight into what has happened. The hard part is understanding why it happened, what should be prioritized, and which actions should be considered.",
      highlight: "This is what Smart Merd is built to solve.",
      sources: ["Production system", "Environmental sensors", "Feeding data", "Biological observations", "History"],
    },
    dataToAction: {
      headline: "From data to action",
      cards: [
        {
          n: "01",
          title: "What is happening?",
          text: "Identify relevant changes, deviations and trends in production.",
        },
        {
          n: "02",
          title: "Why is it happening?",
          text: "Analyze relationships across multiple data sources and surface possible causes.",
          chain: ["Feeding", "Environment", "Biology", "Production"],
        },
        {
          n: "03",
          title: "What should we do now?",
          text: "Present prioritized observations and actions that give a better basis for the next decision.",
          card: {
            priority: "Priority",
            priorityValue: "High",
            observation: "Observation",
            observationValue: "Reduced feed response over the last 48 h",
            cause: "Possible cause",
            causeValue: "Falling oxygen levels combined with a temperature shift",
            recommendation: "Recommended assessment",
            recommendationValue: "Consider an adjusted feeding plan and close monitoring of oxygen levels",
            confidence: "Confidence",
          },
        },
      ],
    },
    statement: {
      line1: "The goal is not to give the farmer more graphs or alerts.",
      line2: "The goal is to make existing information easier to understand and use in daily operations.",
    },
    intelligence: {
      headline: "A decision layer above existing systems",
      p1: "Smart Merd is not built to replace the production systems, sensors or feeding solutions the farmer already uses.",
      p2: "The platform is developed as a vendor-independent decision layer above existing systems and data sources.",
      existingLabel: "Existing systems",
      existing: ["Production systems", "Feeding systems", "Environmental sensors", "Biological observations", "Historical production data"],
      hub: "SMART MERD OS™",
      outputLabel: "Decision basis",
      outputs: ["Understanding", "Prioritization", "Decision support", "Action"],
    },
    capabilities: {
      headline: "From fragmented data to operational understanding",
      items: [
        { title: "COLLECT", text: "Collect and structure production and environmental data." },
        { title: "DETECT", text: "Identify deviations, patterns and relationships." },
        { title: "EXPLAIN", text: "Explain what may have influenced production development." },
        { title: "LEARN", text: "Support learning across sites and production cycles." },
        { title: "PRIORITIZE", text: "Help production management understand what requires attention." },
        { title: "DECIDE", text: "Give production management a clearer, more holistic decision basis." },
      ],
    },
    feeding: {
      headline: "We start with feeding",
      p1: "Feeding is one of the most important biological and economic decision areas in aquaculture.",
      p2: "Smart Merd therefore focuses first on the relationship between feeding, production development and environmental conditions.",
      variables: ["Feeding", "Temperature", "Oxygen", "Biomass", "Growth", "Production development"],
      states: [
        {
          key: "normal",
          label: "NORMAL DEVELOPMENT",
          text: "Everything is operating within expected parameters.",
        },
        {
          key: "change",
          label: "CHANGE DETECTED",
          text: "Smart Merd identifies a meaningful change.",
        },
        {
          key: "action",
          label: "ASSESS ACTION",
          text: "Relevant observations and possible actions are presented to production management.",
        },
      ],
    },
    human: {
      headline: "Technology supports the human",
      p1: "Smart Merd is not built to take over responsibility from biologists, operations managers or production managers.",
      p2: "The system gives them better overview, faster understanding and a more complete basis for making good decisions.",
      statement1: "The human makes the decision.",
      statement2: "Smart Merd makes the decision basis better.",
      flow: ["DATA", "SMART MERD OS™", "HUMAN", "DECISION"],
    },
    product: {
      headline: "Smart Merd OS™ in practice",
      sub: "An operational decision basis, not just a dashboard.",
      sidebar: ["Overview", "Production", "Feeding", "Environment", "Biology", "Observations", "Decision support", "AI Assistant"],
      metrics: [
        { label: "Biomass", value: "842 t", trend: "+1.2%" },
        { label: "Feeding last 24 h", value: "6.4 t", trend: "-3.1%" },
        { label: "Temperature", value: "9.8 °C", trend: "+0.4°" },
        { label: "Oxygen level", value: "87%", trend: "-2.0%" },
        { label: "Growth trend", value: "Stable", trend: "" },
        { label: "Production status", value: "Normal", trend: "" },
      ],
      insightsLabel: "Smart Merd Insights",
      insightTitle: "Change in feed response detected",
      factorsLabel: "Possible contributing factors",
      factors: ["Environmental conditions", "Feeding development", "Historical production patterns"],
      recommendationLabel: "Recommended assessment",
      recommendationValue: "Monitor site oxygen levels and consider an adjusted feeding regime over the next 48 hours.",
      confidenceLabel: "Confidence",
    },
    future: {
      headline: "Built for more decision areas",
      text: "Smart Merd starts with feeding, but the platform architecture is designed to support additional operational decision areas over time.",
      steps: ["FEEDING", "PRODUCTION", "ENVIRONMENT", "BIOLOGY", "OPERATIONAL DECISION SUPPORT"],
      layerLabel: "SMART MERD OS™ — the decision layer connecting every area",
    },
    contact: {
      headline: "Want to learn more about Smart Merd OS™?",
      sub: "Get in touch for an introduction to the platform and how Smart Merd can be used as decision support in modern aquaculture.",
      fields: {
        name: "Name",
        company: "Company",
        position: "Position",
        email: "Email",
        phone: "Phone",
        topic: "What would you like to learn more about?",
        message: "Message",
      },
      optional: "Optional",
      topics: [
        "Smart Merd OS™",
        "Feeding and production analysis",
        "Integration with existing systems",
        "Pilot / Partnership",
        "Demo",
        "Other",
      ],
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
      demoTopic: "Demo",
    },
    finalCta: {
      line1: "From data to understanding.",
      line2: "From understanding to action.",
      sub: "Smart Merd OS™ gives production management a better basis for the next decision.",
      ctaPrimary: "Request a demo",
      ctaSecondary: "Contact us",
    },
    footer: {
      tagline: "From data to understanding. From understanding to action.",
      links: {
        platform: "Platform",
        technology: "Technology",
        about: "About us",
        contact: "Contact",
        privacy: "Privacy",
        cookies: "Cookies",
      },
      rights: "All rights reserved.",
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
