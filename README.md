# Dukora — marketingwebsite

Next.js 14 (App Router) + TypeScript + Tailwind, statisch gegenereerd. Gebouwd volgens de design-handoff.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Waar staat wat
- `app/` — routes: `/`, `/[material]` (kunststof/aluminium/houten-kozijnen), `/projecten`, `/offerte-aanvragen`, `/over-ons`, `/contact`, `api/offerte`, `api/contact`
- `lib/products.ts` — productcontent (specs, voordelen, FAQ) · `lib/offerte.ts` — validatie (client én server) · `lib/site.ts` — telefoon, nav, URL
- `components/Photo.tsx` — foto of placeholder. Zet `src="/img/…"` (bestanden in `public/img/`) zodra de klant beeld aanlevert.

## Configuratie (env)
| Variabele | Doel |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical/sitemap (default `https://www.dukora.nl`) |
| `RESEND_API_KEY`, `MAIL_FROM` | mail via Resend; zonder key wordt alleen gelogd |
| `OFFERTE_TO`, `CONTACT_TO` | ontvangeradres (default `info@dukora.nl`) |

## Nog te doen (zie handoff)
Alle `[…]`-placeholders vervangen, echte fotografie en reviews, Google Maps-embed (na consent), GTM + consent-banner, Turnstile i.p.v. de in-memory rate-limit, `/deuren`, `/schuifpuien`, `/veelgestelde-vragen`.
