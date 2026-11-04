import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/kunststof-kozijnen', '/kunststof-kozijnen/ideal-7000-nl', '/aluminium-kozijnen', '/houten-kozijnen', '/projecten', '/offerte-aanvragen', '/over-ons', '/contact'].map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 }));
}
