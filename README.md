# Smart Merd — Marketing Site

A premium, bilingual (Norwegian/English) marketing site for Smart Merd and Smart Cage, a decision-support platform for aquaculture. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/page.tsx` — assembles the sections: Hero, Modes, HowItWorks, FeedingIntelligence, Status, Technology, Contact, FinalCTA
- `app/layout.tsx` — fonts, SEO metadata, JSON-LD structured data
- `app/api/contact/route.ts` — contact form endpoint (validation + honeypot + timing spam check)
- `lib/i18n.tsx` — the NO/EN translation dictionary and language context (default: Norwegian, persisted to `localStorage`)
- `lib/demo.ts` — `requestContact(topicIndex)`: scroll to the contact form and preselect the enquiry type (pilot / partner / general)
- `lib/modes.ts` — one colour per operating mode (Historic amber, Live cyan, Simulation violet)
- `components/` — one component per section; `ui.tsx` holds the shared SectionHeader and status Tag; `Mockups.tsx` the three mode mockups

## Contact form — next steps before going live

The `/api/contact` route currently validates submissions server-side and logs them to the server console, but **does not send an email or push to a CRM yet**. Before launch, wire it up to a provider such as Resend, Postmark, or a CRM webhook (HubSpot, Pipedrive) inside `app/api/contact/route.ts`.

## Assets

`public/logo-icon.png` is a cropped, square version of `logo.png` (the mark only, no wordmark) used for the nav, footer, final CTA, and social-share metadata, since the source file's mark + wordmark lockup is a 3:2 rectangle and doesn't scale down to a small square without distortion. A dedicated 1200×630 Open Graph banner should be designed before launch — the current OG image is just the square mark.

## Content to finalize

- Footer "Personvern" (Privacy) and "Cookies" links are currently plain labels — add real policy pages when legal content is ready.
- `app/layout.tsx` and `app/sitemap.ts` use a placeholder domain (`https://smartmerd.no`) — update once the production domain is confirmed.
- Company/contact details in the footer are placeholders.

## Build & lint

```bash
npm run build
npx eslint .
```

## Content rules

- Name: **Smart Merd** (company/platform) and **Smart Cage** (product). Never "OS" or "™".
- NO and EN dictionaries in `lib/i18n.tsx` must keep identical structure.
- Anything illustrative (figures, confidence, simulated results) must carry the "Illustrative" / "Example" label until validated.
- The Development status split (`status` in `lib/i18n.tsx`) is a draft: confirm with the team.
