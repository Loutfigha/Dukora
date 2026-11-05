#!/usr/bin/env node
// Rendert posts naar afbeeldingen: node social/scripts/render.mjs [post-id] [--alles]
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import { FORMATEN, ROOT, esc, laadPosts, parseArgs, veiligPad } from './lib/posts.mjs';

const args = parseArgs(process.argv.slice(2));
const sjabloon = readFileSync(join(ROOT, 'social/templates/post.html'), 'utf8');
const bouw = join(ROOT, 'social/.build');
mkdirSync(bouw, { recursive: true });
const regels = (t) => esc(t).replaceAll('\n', '<br>');
const url = (rel) => pathToFileURL(veiligPad(rel)).href;
const catalogus = JSON.parse(readFileSync(join(ROOT, 'data/catalogus.json'), 'utf8'));

function inhoud(post, formaat) {
  const i = post.inhoud;
  const logo = `<img class="logo" src="${url('public/brand/dukora-logo-wit.svg')}" alt="">`;
  const rij = `<div class="rij"><span class="cta">${esc(i.cta)}</span><span class="url">${esc(i.url ?? 'dukora.nl')}</span></div>`;
  if (post.stijl === 'tekst') return `<div class="vlak s-tekst">${logo}<h1 class="kop">${regels(i.kop)}</h1>${rij}</div>`;
  if (post.stijl === 'foto') {
    return `<div class="vlak s-foto"><img class="foto" src="${url(i.foto)}" alt=""><div class="laag"></div>${logo}<h1 class="kop">${regels(i.kop)}</h1>${rij}</div>`;
  }
  if (post.stijl === 'product') {
    const [cat, slug] = i.product.split('/');
    const bestand = `public/img/catalogus/${cat}/${slug}.webp`;
    if (!catalogus.some((p) => p.cat === cat && p.slug === slug)) throw new Error(`Onbekend product: ${i.product}`);
    const feiten = (i.feiten ?? []).map((f) => `<div class="feit"><b>${esc(f.n)}</b><span>${esc(f.l)}</span></div>`).join('');
    return `<div class="vlak s-product">${logo}<div class="blok"><p class="label">${esc(i.label)}</p><h1 class="kop">${regels(i.kop)}</h1></div><div class="beeld"><div class="plaat"><img src="${url(bestand)}" alt=""></div><div class="feiten">${feiten}</div></div>${rij}</div>`;
  }
  throw new Error(`Onbekende stijl: ${post.stijl}`);
}

const posts = laadPosts({ id: args._[0] });
if (!posts.length) { console.error('Geen posts gevonden.'); process.exit(1); }

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--allow-file-access-from-files'] });
let gemaakt = 0;
try {
  for (const { map, post } of posts) {
    for (const naam of post.formaten) {
      const f = FORMATEN[naam];
      if (!f) throw new Error(`${post.id}: onbekend formaat ${naam}`);
      const uit = join(map, `${naam}.png`);
      if (existsSync(uit) && !args.alles && !args._[0]) continue;
      const html = sjabloon
        .replaceAll('{{TITEL}}', esc(post.titel)).replaceAll('{{FORMAAT}}', naam)
        .replaceAll('{{PX}}', f.px).replaceAll('{{PT}}', f.pt).replaceAll('{{PB}}', f.pb).replaceAll('{{KOP}}', f.kop)
        .replaceAll('{{FONT_NEWSREADER}}', url('app/fonts/Newsreader-Variable.woff2')).replaceAll('{{FONT_INTER}}', url('app/fonts/Inter-Variable.woff2'))
        .replaceAll('{{FOTO_POS}}', esc(post.inhoud.fotoPositie ?? '50% 35%')).replace('{{INHOUD}}', inhoud(post, naam));
      const tijdelijk = join(bouw, `${post.id}-${naam}.html`);
      writeFileSync(tijdelijk, html);
      const p = await browser.newPage({ viewport: { width: f.w, height: f.h }, deviceScaleFactor: 1 });
      await p.goto(pathToFileURL(tijdelijk).href);
      await p.evaluate(() => document.fonts.ready);
      await p.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), { timeout: 10000 });
      // controle: past de tekst binnen het vlak?
      const past = await p.evaluate(() => { const v = document.querySelector('.vlak'); return v.scrollHeight <= v.clientHeight + 1 && v.scrollWidth <= v.clientWidth + 1; });
      await p.screenshot({ path: uit, clip: { x: 0, y: 0, width: f.w, height: f.h } });
      await p.close();
      gemaakt++;
      console.log(`${past ? '✓' : '⚠ past niet'}  ${relative(ROOT, uit)}  (${f.w}×${f.h})`);
    }
  }
} finally { await browser.close(); }
console.log(`${gemaakt} afbeelding(en) gemaakt.`);
