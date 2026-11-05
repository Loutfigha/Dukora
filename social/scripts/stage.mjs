#!/usr/bin/env node
// Zet goedgekeurde posts klaar: kopieert de afbeeldingen naar public/social/<id>/ (zodat de site ze openbaar serveert)
// en zet de status op "gepland". Gebruik: node social/scripts/stage.mjs [post-id]
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { FORMATEN, ROOT, bewaar, laadPosts, parseArgs } from './lib/posts.mjs';

const args = parseArgs(process.argv.slice(2));
let klaar = 0;
for (const p of laadPosts({ id: args._[0] })) {
  const { post } = p;
  if (post.status !== 'goedgekeurd') { if (args._[0]) console.log(`- ${post.id}: status is "${post.status}", niet "goedgekeurd"`); continue; }
  if (!post.controle?.ok) { console.error(`✗ ${post.id}: geen geslaagde keuring (npm run social:check -- ${post.id} --schrijf)`); process.exitCode = 1; continue; }
  const doel = join(ROOT, 'public/social', post.id);
  mkdirSync(doel, { recursive: true });
  for (const n of post.formaten) {
    const bron = join(p.map, `${n}.png`);
    if (!existsSync(bron)) { console.error(`✗ ${post.id}: ${n}.png ontbreekt`); process.exitCode = 1; continue; }
    copyFileSync(bron, join(doel, `${n}.png`));
  }
  post.status = 'gepland';
  post.gepland_op = new Date().toISOString();
  bewaar(p);
  klaar++;
  console.log(`✓ ${post.id}: klaargezet in public/social/${post.id}/ (status: gepland). Commit en push naar main, zodat de site de afbeeldingen serveert.`);
}
console.log(`${klaar} post(s) klaargezet.`);
