import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
export const POSTS = join(ROOT, 'social/posts');
export const FORMATEN = JSON.parse(readFileSync(join(ROOT, 'social/formats.json'), 'utf8'));
export const STATUSSEN = ['concept', 'goedgekeurd', 'afgekeurd', 'gepland', 'gepubliceerd'];

export function laadPosts({ id } = {}) {
  if (!existsSync(POSTS)) return [];
  return readdirSync(POSTS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && (!id || d.name === id))
    .map((d) => {
      const bestand = join(POSTS, d.name, 'post.json');
      if (!existsSync(bestand)) return null;
      return { map: join(POSTS, d.name), bestand, post: JSON.parse(readFileSync(bestand, 'utf8')) };
    })
    .filter(Boolean);
}

export const bewaar = (p) => writeFileSync(p.bestand, JSON.stringify(p.post, null, 2) + '\n');

/** Een pad uit een post mag alleen naar bestanden binnen de repo wijzen. */
export function veiligPad(rel) {
  const abs = resolve(ROOT, rel);
  if (abs !== ROOT && !abs.startsWith(ROOT + sep)) throw new Error(`Pad buiten de repo: ${rel}`);
  return abs;
}

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function parseArgs(argv) {
  const a = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      a[k] = v;
    } else a._.push(argv[i]);
  }
  return a;
}
