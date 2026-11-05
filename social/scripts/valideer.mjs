#!/usr/bin/env node
// Keurt posts tegen het format, de tone of voice en de feiten: node social/scripts/valideer.mjs [post-id] [--schrijf] [--json]
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { FORMATEN, ROOT, STATUSSEN, bewaar, laadPosts, parseArgs, veiligPad } from './lib/posts.mjs';

const args = parseArgs(process.argv.slice(2));
const catalogus = JSON.parse(readFileSync(join(ROOT, 'data/catalogus.json'), 'utf8'));
const PILAREN = ['product', 'team', 'tips', 'project', 'review', 'bedrijf'];
const STIJLEN = ['tekst', 'foto', 'product'];
const VERBODEN = /allerbeste|beste prijs|goedkoopste|korting|aanbieding|\bactie\b|profiteer|nu of nooit|100\s?%|garantie op alles|nummer 1|marktleider/i;
const JE_VORM = /\b(je|jij|jouw|jou)\b/i;

const pngMaat = (f) => { const b = readFileSync(f); return b.toString('ascii', 1, 4) === 'PNG' ? { w: b.readUInt32BE(16), h: b.readUInt32BE(20) } : null; };
const getallen = (t) => [...String(t).matchAll(/\d+(?:[.,]\d+)?/g)].map((m) => m[0]);

function keur({ map, post }, mapnaam) {
  const f = [], w = [];
  const fout = (m) => f.push(m), waarschuw = (m) => w.push(m);
  const i = post.inhoud ?? {};

  if (post.id !== mapnaam) fout(`id "${post.id}" komt niet overeen met de mapnaam "${mapnaam}"`);
  if (!post.titel) fout('titel ontbreekt');
  if (!PILAREN.includes(post.pilaar)) fout(`pilaar moet een van ${PILAREN.join(', ')} zijn`);
  if (!STIJLEN.includes(post.stijl)) fout(`stijl moet een van ${STIJLEN.join(', ')} zijn`);
  if (!STATUSSEN.includes(post.status)) fout(`status moet een van ${STATUSSEN.join(', ')} zijn`);
  if (!Array.isArray(post.formaten) || !post.formaten.length) fout('formaten ontbreekt');
  for (const n of post.formaten ?? []) if (!FORMATEN[n]) fout(`onbekend formaat "${n}"`);
  if (Number.isNaN(Date.parse(post.publiceer_op))) fout('publiceer_op is geen geldige datum met tijdzone');
  else if (['concept', 'goedgekeurd'].includes(post.status) && Date.parse(post.publiceer_op) < Date.now()) waarschuw('publiceer_op ligt in het verleden');

  // Format: één kop, één knop
  const kop = String(i.kop ?? '');
  if (!kop) fout('inhoud.kop ontbreekt');
  if (kop.replace(/\n/g, '').length > 70) fout(`kop is te lang (${kop.replace(/\n/g, '').length} tekens, maximaal 70)`);
  if (kop.split('\n').length > 3) fout('kop mag maximaal 3 regels hebben');
  if (!i.cta) fout('inhoud.cta ontbreekt (precies één knop per afbeelding)');
  else if (i.cta.length > 40) fout('cta is te lang (maximaal 40 tekens)');
  if (/\n/.test(i.cta ?? '')) fout('cta mag maar één regel zijn');

  // Tone of voice
  const alleTekst = [kop, i.cta, i.label, post.tekst?.instagram, post.tekst?.linkedin].filter(Boolean).join('\n');
  if (/!/.test(alleTekst)) fout('uitroeptekens zijn niet toegestaan (tone of voice)');
  const v = alleTekst.match(VERBODEN); if (v) fout(`woord/uitdrukking niet toegestaan: "${v[0]}"`);
  const j = alleTekst.match(JE_VORM); if (j) waarschuw(`je-vorm gevonden ("${j[0]}"): Dukora spreekt klanten aan met u`);
  for (const [p, t] of Object.entries(post.tekst ?? {})) {
    const langste = Math.max(...String(t).split(/(?<=[.?])\s+/).map((z) => z.split(/\s+/).length));
    if (langste > 28) waarschuw(`${p}: een zin heeft ${langste} woorden (korte zinnen, maximaal ~25)`);
  }

  // Per platform
  const platformen = [...new Set((post.formaten ?? []).map((n) => FORMATEN[n]?.platform).filter(Boolean))];
  for (const p of platformen) {
    const t = post.tekst?.[p];
    if (!t) { fout(`tekst.${p} ontbreekt`); continue; }
    const tags = post.hashtags?.[p] ?? [];
    const lengte = t.length + tags.join(' ').length;
    const max = p === 'instagram' ? 2200 : 3000;
    if (lengte > max) fout(`tekst.${p} is te lang (${lengte} van ${max} tekens)`);
    if (p === 'instagram' && tags.length > 8) waarschuw(`${tags.length} hashtags op Instagram; 3 tot 8 werkt beter`);
    if (p === 'linkedin' && tags.length > 3) waarschuw(`${tags.length} hashtags op LinkedIn; maximaal 3`);
    for (const h of tags) if (!/^#[\p{L}\p{N}_]+$/u.test(h)) fout(`ongeldige hashtag "${h}"`);
    if (p === 'instagram' && /https?:\/\//.test(t)) waarschuw('links in een Instagram-bijschrift zijn niet klikbaar; verwijs naar de link in de bio');
  }
  if (platformen.includes('instagram') && !post.alt) fout('alt (beschrijving van de afbeelding) ontbreekt');

  // Feiten: elk getal moet uit de productgegevens komen
  if (post.stijl === 'product') {
    const [cat, slug] = String(i.product ?? '').split('/');
    const product = catalogus.find((p) => p.cat === cat && p.slug === slug);
    if (!product) fout(`product "${i.product}" bestaat niet in data/catalogus.json`);
    else {
      const bron = JSON.stringify(product).replace(/\\u00a0/g, ' ');
      for (const ft of i.feiten ?? []) if (!bron.includes(ft.n)) fout(`feit "${ft.n}" staat niet in de productgegevens van ${i.product}`);
      for (const [p, t] of Object.entries(post.tekst ?? {})) for (const g of new Set(getallen(t))) if (!bron.includes(g) && !['1230', '1480', '0,5'].includes(g)) waarschuw(`tekst.${p}: getal "${g}" niet teruggevonden in de productgegevens, controleer het`);
    }
  } else if (/\d/.test(Object.values(post.tekst ?? {}).join(' '))) {
    waarschuw('de tekst bevat cijfers: controleer ze handmatig tegen de site');
  }
  if (!post.bronnen?.length) waarschuw('bronnen ontbreken: waar komen de feiten vandaan?');

  // Beeld
  if (post.stijl === 'foto') {
    try { const p = veiligPad(i.foto ?? ''); if (!existsSync(p)) fout(`foto bestaat niet: ${i.foto}`); } catch (e) { fout(e.message); }
  }
  for (const n of post.formaten ?? []) {
    const png = join(map, `${n}.png`);
    if (!existsSync(png)) { waarschuw(`afbeelding ${n}.png ontbreekt (npm run social:render)`); continue; }
    const m = pngMaat(png), fm = FORMATEN[n];
    if (fm && m && (m.w !== fm.w || m.h !== fm.h)) fout(`${n}.png is ${m.w}×${m.h}, verwacht ${fm.w}×${fm.h}`);
    if (statSync(png).mtimeMs < statSync(join(map, 'post.json')).mtimeMs - 1000 && statSync(png).mtimeMs < Date.parse(post.gewijzigd ?? 0)) waarschuw(`${n}.png is ouder dan post.json, render opnieuw`);
  }
  return { fouten: f, waarschuwingen: w };
}

const posts = laadPosts({ id: args._[0] });
let aantalFouten = 0; const uit = [];
for (const p of posts) {
  const mapnaam = p.map.split('/').pop();
  const r = keur(p, mapnaam);
  aantalFouten += r.fouten.length;
  uit.push({ id: mapnaam, ...r });
  if (args.schrijf) { p.post.controle = { ok: r.fouten.length === 0, datum: new Date().toISOString(), fouten: r.fouten, waarschuwingen: r.waarschuwingen }; bewaar(p); }
}
if (args.json) console.log(JSON.stringify(uit, null, 2));
else for (const r of uit) {
  console.log(`${r.fouten.length ? '✗' : '✓'} ${r.id}`);
  r.fouten.forEach((m) => console.log(`    FOUT        ${m}`));
  r.waarschuwingen.forEach((m) => console.log(`    waarschuwing ${m}`));
}
console.log(`\n${posts.length} post(s) gekeurd, ${aantalFouten} fout(en).`);
process.exit(aantalFouten ? 1 : 0);
