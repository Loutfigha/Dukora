---
description: Maak de social posts voor een week (planning, teksten, beeld, keuring) en zet ze als concept klaar. Publiceert niets.
argument-hint: "[week of startdatum, bv. 2026-11-16] [aantal posts]"
---

Maak de social posts voor Dukora voor: $ARGUMENTS (zonder opgave: de eerstvolgende week, drie posts).

Werk met de agents, in deze volgorde, en geef elke agent alleen wat hij nodig heeft:
1. **social-planner**: maakt de lege posts (`status: concept`).
2. **social-schrijver**: vult koppen, bijschriften, hashtags en alt-tekst.
3. **social-banner**: rendert de afbeeldingen en keurt ze visueel.
4. **social-controleur**: keurt format, toon en feiten en schrijft het resultaat naar `controle`.

Heeft de controleur iets "aanpassen" genoemd, laat de schrijver of de beeldmaker het herstellen en laat de controleur opnieuw keuren (maximaal twee rondes; daarna melden wat er nog openstaat).

Eindig met een overzicht: per post de datum, het onderwerp, de formaten, de uitslag van de controle en de paden naar de afbeeldingen, zodat de eigenaar ze kan bekijken. Zeg er duidelijk bij dat de eigenaar ze goedkeurt met `/social-keur-goed <post-id>`.

**Je publiceert niets, je zet geen status hoger dan `concept` en je pusht niets naar `main`.** Commit het resultaat op een eigen branch `social/<startdatum>` en push alleen die branch.
