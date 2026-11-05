---
description: Zet goedgekeurde posts klaar en publiceer ze, eerst als proef. Echt publiceren alleen na uitdrukkelijke bevestiging.
argument-hint: "[post-id] [--live]"
---

Publiceer de goedgekeurde Dukora-posts: $ARGUMENTS

Gebruik de agent **social-publicist** en volg zijn regels:
1. Zet de goedgekeurde posts klaar met `node social/scripts/stage.mjs` en commit en push de afbeeldingen in `public/social/`. Wacht tot de site gedeployed is.
2. Doe een proefrun (`node social/scripts/publiceer.mjs`) en laat zien wat er verstuurd zou worden.
3. Alleen als de eigenaar in dit gesprek duidelijk "ja, publiceer" zegt of `--live` heeft meegegeven én `SOCIAL_PUBLISH=1` is ingesteld: `node social/scripts/publiceer.mjs --live`.
4. Meld per post en platform het resultaat.
