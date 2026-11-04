# Dukora huisstijl (brand guide v1.0, november 2026)

Samenvatting van de brand guide, zodat iedereen die aan de site werkt dezelfde regels volgt.

## Logo
- **Beeldmerk:** de verstek-D, een D opgebouwd als kozijnprofiel (raster 48 × 48, profielbreedte 9, hoeken van 45°, vier dunne verstekvoegen). Component: `components/Logo.tsx`.
- **Woordmerk:** DUKORA in Inter Semibold, kapitalen, spatiëring +160 (`tracking-[.16em]`).
- **Varianten:** primair (Bos op wit), negatief (wit op Bos), gestapeld (Salie op Nacht), beeldmerk los (favicon, app, social).
- **Vrije ruimte:** minimaal ¾ van de hoogte van het beeldmerk rondom.
- **Minimaal formaat:** logo 96 px, beeldmerk 16 px. Onder 32 px vervallen de voegen (massieve versie).
- **Niet doen:** vervormen, draaien, andere kleuren, laag contrast, schaduwen, verlopen of effecten.
- **Bestanden:** de officiële logobestanden staan in `public/brand/` (primair, antraciet, wit, gestapeld, beeldmerk in Bos, Salie en wit, klein en app-icoon). De componenten gebruiken dezelfde paden (`components/logo-data.ts`, gegenereerd uit die bestanden). Pas die paden niet met de hand aan.

## Kleur
| Naam | Hex | Gebruik |
|---|---|---|
| Bos | `#263B31` | Logo, knoppen, accentvlakken. Spaarzaam: één vlak per pagina. |
| Antraciet | `#1F2427` | Koppen en tekst |
| Mist | `#F3F5F4` | Achtergrond |
| Wit | `#FFFFFF` | Kaarten, formulieren |
| Nacht | `#161B1D` | Footer, donkere vlakken |
| Grafiet | `#3A4540` | Lopende tekst |
| Leisteen | `#58635D` | Secundaire tekst |
| Salie | `#B8CFC0` | Accent op donker |
| Lijn | `#D6DDD9` | Randen, scheidingen |

Tailwind-namen: `bos`, `antraciet`, `mist`, `wit`, `nacht`, `grafiet`, `leisteen`, `salie`, `lijn` (plus de oudere aliassen `dennen`, `ink`, `glas`, `steen`).

## Typografie
- **Newsreader** (Light 300 en Regular 400): alleen voor koppen en grote citaten, met licht negatieve spatiëring.
- **Inter** (400, 500, 600): lopende tekst, knoppen, formulieren en het woordmerk.
- H1 Newsreader 300 · H2 Newsreader 400 · Label Inter 500, 13 px, +14, kapitalen (`.label`) · Body Inter 400, 17/27 · Knop Inter 500, 15,5.

## Tone of voice
Rustig, precies en eerlijk. Advies, geen verkoop.
- **Persoonlijk:** u, wij, onze monteurs. Eén aanspreekpunt.
- **Kort en direct:** korte zinnen, het belangrijkste vooraan.
- **Eerlijk:** geen druk of superlatieven; beloof alleen wat op papier staat (planning, prijs, garantie).
- **Concreet:** toon het resultaat (warmer, stiller, minder onderhoud) en leg techniek uit in gewone woorden.

Zo wel: "Een specialist belt u binnen één werkdag terug." · "Het verschil merkt u de eerste winter." · "Onze eigen monteurs plaatsen uw kozijnen. Geen onderaannemers."
Zo niet: uitroeptekens, "allerbeste", "alleen deze week 30% korting".
