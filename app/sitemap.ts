import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { CATEGORIES, DEUREN, PRODUCTS } from '@/lib/catalogus';

export default function sitemap(): MetadataRoute.Sitemap {
  const paden = [
    '',
    ...Object.values(CATEGORIES).map((c) => c.path),
    ...PRODUCTS.map((p) => `${CATEGORIES[p.cat].path}/${p.slug}`),
    ...DEUREN.map((d) => `${CATEGORIES['pvc-deuren'].path}/${d.slug}`),
    '/offerte-aanvragen', '/over-ons', '/contact',
  ];
  return paden.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 }));
}
