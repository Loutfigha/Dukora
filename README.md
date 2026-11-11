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
| `NEXT_PUBLIC_SITE_URL` | canonical/sitemap (default `https://dukora.nl`); moet vóór de bouw staan |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | mail via SMTP, bv. de mailbox op het domein bij Hostinger |
| `RESEND_API_KEY` | alternatief voor SMTP: mail via Resend |
| `MAIL_FROM` | afzender, een adres op het eigen domein (default `Dukora <info@dukora.nl>`) |
| `OFFERTE_TO`, `CONTACT_TO` | ontvangeradres (default `info@dukora.nl`) |
| `NEXT_PUBLIC_KVK`, `NEXT_PUBLIC_BTW` | bedrijfsgegevens in de footer (optioneel) |

Zonder SMTP of Resend worden formulieren alleen gelogd. Hosten op Hostinger: zie `docs/HOSTINGER.md`.

## Nog te doen (zie handoff)
Alle `[…]`-placeholders vervangen, echte fotografie en reviews, Google Maps-embed (na consent), GTM + consent-banner, Turnstile i.p.v. de in-memory rate-limit, `/deuren`, `/schuifpuien`, `/veelgestelde-vragen`.
