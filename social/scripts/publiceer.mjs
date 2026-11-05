#!/usr/bin/env node
// Publiceert klaargezette posts waarvan het tijdstip is aangebroken.
//   node social/scripts/publiceer.mjs                 → proefmodus (er wordt niets verstuurd)
//   node social/scripts/publiceer.mjs --live          → echt publiceren, mits SOCIAL_PUBLISH=1 is ingesteld
//   --id <post>  --platform instagram|linkedin  --proef-alles (proefmodus: ook posts die nog niet klaar zijn)
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FORMATEN, ROOT, bewaar, laadPosts, parseArgs } from './lib/posts.mjs';
import { publiceerInstagram, voorbeeldInstagram } from './lib/instagram.mjs';
import { publiceerLinkedIn, voorbeeldLinkedIn } from './lib/linkedin.mjs';

const args = parseArgs(process.argv.slice(2));
const live = !!args.live;
if (live && process.env.SOCIAL_PUBLISH !== '1') { console.error('Echt publiceren vraagt twee bevestigingen: --live én SOCIAL_PUBLISH=1. Niets verstuurd.'); process.exit(2); }
const BASIS = (process.env.SOCIAL_BASE_URL || 'https://www.dukora.nl').replace(/\/$/, '');
const nu = Date.now();

const tag = (p, naam) => (p.post.hashtags?.[naam] ?? []);
const bijschrift = (p) => [p.post.tekst.instagram, tag(p, 'instagram').join(' ')].filter(Boolean).join('\n\n');
const openbaar = (post, formaat) => `${BASIS}/social/${post.id}/${formaat}.png`;

async function bereikbaar(url) { try { return (await fetch(url, { method: 'HEAD' })).ok; } catch { return false; } }

/** Bepaalt wat er naar welk platform gaat: [{platform, sleutel, ...}] */
function taken(p) {
  const f = p.post.formaten, t = [];
  if (f.some((n) => FORMATEN[n].platform === 'instagram') && p.post.tekst?.instagram) {
    const feed = f.includes('instagram-post') ? 'instagram-post' : f.includes('instagram-portret') ? 'instagram-portret' : null;
    if (feed) t.push({ platform: 'instagram', sleutel: 'instagram', type: 'feed', formaat: feed });
    if (f.includes('instagram-story')) t.push({ platform: 'instagram', sleutel: 'instagram-story', type: 'story', formaat: 'instagram-story' });
  }
  if (f.includes('linkedin') && p.post.tekst?.linkedin) t.push({ platform: 'linkedin', sleutel: 'linkedin', formaat: 'linkedin' });
  return t.filter((x) => !args.platform || x.platform === args.platform);
}

let aantal = 0, fouten = 0;
console.log(live ? '⚠ LIVE-modus: er wordt echt gepubliceerd.\n' : 'Proefmodus: er wordt niets verstuurd.\n');
for (const p of laadPosts({ id: args.id })) {
  const { post } = p;
  const klaarVoorPublicatie = post.status === 'gepland' && Date.parse(post.publiceer_op) <= nu;
  if (!klaarVoorPublicatie && !(args['proef-alles'] && !live)) {
    console.log(`- ${post.id}: ${post.status}${post.status === 'gepland' ? ` (staat gepland voor ${post.publiceer_op})` : ''}, overgeslagen`);
    continue;
  }
  if (!post.controle?.ok && !args['proef-alles']) { console.error(`✗ ${post.id}: keuring ontbreekt of is mislukt, niet gepubliceerd`); fouten++; continue; }
  post.resultaat ??= {};
  for (const taak of taken(p)) {
    if (post.resultaat[taak.sleutel]?.id) { console.log(`- ${post.id} → ${taak.sleutel}: al gepubliceerd (${post.resultaat[taak.sleutel].id})`); continue; }
    const imageUrl = openbaar(post, taak.formaat);
    try {
      if (!live) {
        const v = taak.platform === 'instagram'
          ? voorbeeldInstagram({ imageUrl, caption: bijschrift(p), alt: post.alt, type: taak.type })
          : voorbeeldLinkedIn({ tekst: post.tekst.linkedin, hashtags: tag(p, 'linkedin'), alt: post.alt });
        console.log(`◦ ${post.id} → ${taak.sleutel} (proef)\n    afbeelding: ${imageUrl}\n    ${JSON.stringify(v).slice(0, 400)}…`);
        aantal++; continue;
      }
      if (!(await bereikbaar(imageUrl))) throw new Error(`afbeelding is nog niet openbaar bereikbaar: ${imageUrl} (is de site opnieuw gedeployed?)`);
      let id;
      if (taak.platform === 'instagram') id = await publiceerInstagram({ imageUrl, caption: bijschrift(p), alt: post.alt, type: taak.type });
      else id = await publiceerLinkedIn({ imageBytes: readFileSync(join(p.map, `${taak.formaat}.png`)), tekst: post.tekst.linkedin, hashtags: tag(p, 'linkedin'), alt: post.alt });
      post.resultaat[taak.sleutel] = { id, tijd: new Date().toISOString() };
      bewaar(p); aantal++;
      console.log(`✓ ${post.id} → ${taak.sleutel}: gepubliceerd (${id})`);
    } catch (e) {
      fouten++; post.resultaat[taak.sleutel] = { ...post.resultaat[taak.sleutel], fout: e.message, tijd: new Date().toISOString() }; if (live) bewaar(p);
      console.error(`✗ ${post.id} → ${taak.sleutel}: ${e.message}`);
    }
  }
  if (live && taken(p).every((x) => post.resultaat[x.sleutel]?.id)) { post.status = 'gepubliceerd'; bewaar(p); }
}
console.log(`\n${aantal} publicatie(s)${live ? '' : ' (proef)'}, ${fouten} fout(en).`);
process.exit(fouten ? 1 : 0);
