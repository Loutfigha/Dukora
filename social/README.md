# Social media: posts maken en publiceren met agents

Instagram en LinkedIn van Dukora, volgens een vast format. Agents maken de posts, een mens keurt, daarna wordt klaargezet en gepubliceerd.

```
planner → schrijver → beeldmaker → controleur ──► jij keurt goed ──► klaarzetten ──► publiceren
 (concept)                                       (goedgekeurd)       (gepland)     (gepubliceerd)
```

## De agents (`.claude/agents/`)
| Agent | Doet | Mag niet |
|---|---|---|
| `social-planner` | kiest onderwerpen en tijdstippen, maakt lege posts | schrijven, publiceren |
| `social-schrijver` | koppen, bijschriften, hashtags, alt-tekst in de tone of voice | status wijzigen |
| `social-banner` | rendert afbeeldingen, kijkt ze na | publiceren, sjablonen "even" aanpassen |
| `social-controleur` | keurt format, toon en feiten, schrijft `controle` | teksten wijzigen, goedkeuren |
| `social-publicist` | zet klaar en publiceert, standaard als proef | iets zonder goedkeuring doen |

## Opdrachten
- `/social-week [startdatum] [aantal]`: maakt een week aan concepten. Publiceert niets.
- `/social-keur-goed <id>`: **jij** keurt goed. Alleen als de controle geslaagd is.
- `/social-publiceer [id] [--live]`: zet klaar en publiceert, eerst als proef.

## Het format van een post (`social/posts/<datum>-<naam>/post.json`)
```jsonc
{
  "id": "2026-11-10-ideal-7000-nl",        // gelijk aan de mapnaam
  "titel": "Ideal 7000 NL",
  "pilaar": "product",                      // product | team | tips | project | review | bedrijf
  "stijl": "product",                       // tekst | foto | product  (de drie sjablonen)
  "formaten": ["instagram-post", "linkedin"],  // zie formats.json
  "inhoud": { "kop": "…", "cta": "…", "url": "dukora.nl", "label": "…", "product": "pvc-ramen/ideal-7000-nl", "feiten": [{ "n": "0,76", "l": "Uw-waarde in W/m²K" }], "foto": "public/img/foto/….webp" },
  "alt": "Beschrijving van de afbeelding",
  "tekst": { "instagram": "…", "linkedin": "…" },
  "hashtags": { "instagram": ["#kozijnen"], "linkedin": ["#bouw"] },
  "publiceer_op": "2026-11-10T08:30:00+01:00",
  "status": "concept",                      // concept → goedgekeurd → gepland → gepubliceerd (of afgekeurd)
  "bronnen": ["data/catalogus.json: pvc-ramen/ideal-7000-nl"]
}
```
Formaten: `instagram-post` 1080×1080 · `instagram-portret` 1080×1350 · `instagram-story` 1080×1920 · `linkedin` 1200×627.

## Scripts (`npm run …`)
| Opdracht | Doet |
|---|---|
| `social:render [id] [-- --alles]` | maakt de PNG's per formaat (Playwright + Chromium; `CHROMIUM_PATH` instellen als Chromium niet automatisch gevonden wordt) |
| `social:check [id] [-- --schrijf]` | keurt format, toon, lengtes, alt-tekst en feiten (elk getal moet in `data/catalogus.json` staan) |
| `social:stage [id]` | goedgekeurd → kopieert beelden naar `public/social/<id>/` en zet `gepland` |
| `social:publish [-- --live]` | publiceert wat gepland is en waarvan het tijdstip is aangebroken. **Standaard proefmodus.** |

## Veiligheid
- Niets wordt gepubliceerd zonder `status: goedgekeurd` én een geslaagde keuring.
- Echt publiceren vraagt twee bevestigingen: de vlag `--live` én `SOCIAL_PUBLISH=1`.
- Dubbel posten is uitgesloten: elk resultaat (`resultaat.<platform>.id`) wordt bewaard en overgeslagen.
- Tokens staan alleen in de omgevingsinstellingen (secrets), nooit in de repo of in een gesprek.

## Instellen voordat er echt gepubliceerd kan worden
**Instagram** (Meta): zakelijk of creator-account, gekoppeld aan een Facebook-pagina; een Meta-app met de rechten `instagram_basic` en `instagram_content_publish` (voor productie is app-review nodig); een langlopend token.
Omgeving: `IG_USER_ID`, `META_ACCESS_TOKEN`. Instagram haalt de afbeelding op via een openbare link, daarom staan goedgekeurde beelden in `public/social/` en moet de site na het klaarzetten opnieuw gedeployed zijn.

**LinkedIn**: een app met toegang tot de Community Management API (voor de bedrijfspagina; LinkedIn moet dat goedkeuren) of `w_member_social` (persoonlijk profiel).
Omgeving: `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_AUTHOR_URN` (bv. `urn:li:organization:123456`), optioneel `LINKEDIN_VERSION`.

Algemeen: `SOCIAL_BASE_URL` (standaard `https://www.dukora.nl`), `SOCIAL_PUBLISH=1` om `--live` toe te staan.

## Wat getest is en wat niet
Getest: renderen van alle stijlen en formaten, de keuring (ook met opzettelijk foute posts), klaarzetten, de volledige publicatieketen tegen een **nagebootste** Instagram- en LinkedIn-server (volgorde van aanroepen, statussen, niet dubbel posten).
**Niet getest tegen de echte API's**, want daarvoor zijn accounts en tokens nodig. De aanroepen volgen de documentatie van Meta en LinkedIn zoals ik die ken; controleer bij de eerste echte run met één post de actuele eisen (API-versies, rechten, limieten) en let op de foutmeldingen.

## Automatisch laten lopen
Een geplande taak kan elke week `/social-week` draaien en de concepten op een branch zetten. Daarna keur jij goed en laat `/social-publiceer` (of een tweede geplande taak) de goedgekeurde posts op het juiste moment plaatsen.
