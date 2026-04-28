# Zeichen des Universums (MVP)

Next.js App Router Funnel: Landing → Freebie → Shop → Checkout → Success → Upsell + Blog + Tools (Big‑3).

## Start

```bash
npm install
npm run dev
```

## Wichtige ENV

- `NEXT_PUBLIC_SITE_URL` (für SEO: Canonicals/Sitemap)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional, GA4 `G-...`)
- `NEXT_PUBLIC_GOOGLE_ADS_ID` (optional, Google Ads `AW-...`)
- `NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO` (für Kauf-Conversion auf `/success`)

## Google Ads Tag/Conversion

- Globales Google Tag wird in `components/SiteAnalytics.tsx` geladen.
- Kauf-Conversion wird serverseitig auf `app/success/page.tsx` ausgelöst, wenn
  `session_id` vorhanden ist und `NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO` gesetzt ist.
- Gesendete Parameter:
  - `send_to`: aus `NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO`
  - `value`: Produktpreis
  - `currency`: `EUR`
  - `transaction_id`: Stripe `session_id`

## Routen (Auszug)

- `/` Homepage
- `/freebie` → `/freebie/download` (nach Lead‑Formular)
- `/shop` + `/shop/[slug]`
- `/tools/birth-chart` (Big‑3)
- `/api/tools/big3` (Berechnung)
- `/sitemap.xml`, `/robots.txt`

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
