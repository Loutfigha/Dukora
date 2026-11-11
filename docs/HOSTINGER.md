# De site op Hostinger zetten (Unlimited Web Hosting met Node.js)

De site is een Next.js-app. Het Hostinger-pakket ondersteunt Next.js (Node 18, 20, 22 en 24), dus alles werkt zoals nu: pagina's, afbeeldingen, redirects en de formulieren.

## 1. Voorbereiding in hPanel
1. **E-mailadres aanmaken** op het domein, bijvoorbeeld `info@dukora.nl` (E-mails → Mailbox aanmaken). Hiermee versturen de formulieren hun mail. Noteer het wachtwoord alleen in hPanel, niet in een gesprek of in de repo.
2. Open bij die mailbox de **SMTP-gegevens** (E-mails → Configuratie). Meestal: server `smtp.hostinger.com`, poort `465` (SSL). Controleer de actuele gegevens in hPanel.

## 2. De app koppelen aan GitHub
1. hPanel → **Websites** → `dukora.nl` → **Node.js** (een Node.js-webapp toevoegen) → **Importeer Git-repository**.
2. Koppel je GitHub-account en kies de repo **`Loutfigha/Dukora`**, branch **`main`**.
3. Instellingen:
   - Framework: **Next.js**
   - Node-versie: **22.x** (20.x of 24.x kan ook)
   - Pakketbeheerder: **npm**
   - Bouwopdracht: `npm run build`
   - Startopdracht: `npm start`
   - Hoofdmap: `./` (de root van de repo)
4. Voeg de **omgevingsvariabelen** hieronder toe en start de eerste deploy. Daarna bouwt Hostinger bij elke push naar `main` opnieuw.

De labels in hPanel kunnen iets anders heten dan hierboven; de instellingen zelf zijn wat telt.

## 3. Omgevingsvariabelen
| Variabele | Waarde | Opmerking |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://dukora.nl` | **Moet staan vóór de bouw.** Bepaalt canonical-links, sitemap en deelafbeelding. Kies één adres (met of zonder `www`) en gebruik dat overal. |
| `SMTP_HOST` | `smtp.hostinger.com` | |
| `SMTP_PORT` | `465` | `587` kan ook (STARTTLS) |
| `SMTP_USER` | `info@dukora.nl` | het volledige e-mailadres |
| `SMTP_PASS` | wachtwoord van die mailbox | alleen in hPanel invoeren |
| `MAIL_FROM` | `Dukora <info@dukora.nl>` | moet een adres op uw eigen domein zijn |
| `OFFERTE_TO` | `info@dukora.nl` | waar offerteaanvragen binnenkomen (standaard `info@dukora.nl`) |
| `CONTACT_TO` | `info@dukora.nl` | waar het contactformulier binnenkomt |
| `NEXT_PUBLIC_KVK`, `NEXT_PUBLIC_BTW` | uw nummers | optioneel; verschijnen dan in de footer |

Zonder `SMTP_HOST` en zonder `RESEND_API_KEY` worden formulieren alleen gelogd en komt er **geen** mail aan. Test dus altijd een formulier na de eerste deploy.

## 4. Het domein laten wijzen naar Hostinger
`dukora.nl` staat al als website in hPanel. Draait de site nu nog op Vercel, wissel dan pas als de Hostinger-versie getest is:
1. Test de site eerst op het tijdelijke adres dat Hostinger toont (of via een preview).
2. hPanel → **Domeinen** → `dukora.nl` → **DNS-zone**: laat de A-record (en eventuele AAAA) naar Hostinger wijzen. Verwijder records die nog naar Vercel wijzen (bv. `cname.vercel-dns.com` of `76.76.21.21`).
3. Laat `www` doorverwijzen naar het hoofdadres (of andersom), zodat er één canonieke versie is.
4. Het SSL-certificaat wordt door Hostinger automatisch geregeld. DNS-wijzigingen kunnen tot enkele uren duren.
5. Verwijder het domein daarna uit het Vercel-project, zodat het niet meer in conflict is.

## 5. Controle na de eerste deploy
- Open `/`, `/pvc-ramen`, `/pvc-deuren`, `/horren`, `/over-ons`, `/contact`.
- Verstuur het contactformulier en een offerte en kijk of beide mails aankomen (ook de bevestiging bij de klant).
- Open `/sitemap.xml`, `/robots.txt` en `/manifest.webmanifest`; controleer dat de adressen `https://dukora.nl` bevatten.
- Controleer het favicon en de deelafbeelding (plak de link in WhatsApp).
- Laat Google Search Console de nieuwe site opnieuw verifiëren als het domein van host wisselt.

## Als iets misgaat
- **Bouw mislukt door geheugen:** de bouw (`next build`) heeft ongeveer 1 GB nodig. Meld het als Hostinger een geheugenfout geeft; dan bouwen we via GitHub Actions en deployen het resultaat.
- **Site toont een foutpagina (502/503):** controleer dat de startopdracht `npm start` is en dat er geen andere poort is vastgezet. Next.js gebruikt automatisch de poort die de host doorgeeft (`PORT`).
- **Geen mail:** controleer `SMTP_*`, dat `MAIL_FROM` bij de mailbox hoort, en kijk in de logs van de app.
- **Verkeerde adressen in de sitemap:** `NEXT_PUBLIC_SITE_URL` stond niet goed tijdens de bouw. Corrigeer en deploy opnieuw.
