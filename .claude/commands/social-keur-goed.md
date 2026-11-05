---
description: Keur een of meer posts goed (alleen de eigenaar). Zet de status op "goedgekeurd" als de controle geslaagd is.
argument-hint: "<post-id> [<post-id> ...]"
---

De eigenaar keurt deze posts goed: $ARGUMENTS

Voor elke post:
1. Draai `node social/scripts/valideer.mjs <id> --schrijf`. Heeft de post fouten, zet de status dan **niet** op `goedgekeurd`, maar meld de fouten.
2. Toon de teksten en de paden naar de afbeeldingen nog één keer in je antwoord, zodat duidelijk is wat er is goedgekeurd.
3. Zet `status` op `goedgekeurd` in `social/posts/<id>/post.json`.

Doe niets anders: niet klaarzetten, niet publiceren. Dat doet `/social-publiceer`.
