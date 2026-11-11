import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES, firstSentence, productBySlug, productsIn } from '@/lib/catalogus';
import ProductDetail from '@/components/ProductDetail';

const CAT = 'pvc-ramen' as const;
export const dynamicParams = false;
export const generateStaticParams = () => productsIn(CAT).map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(CAT, slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${CATEGORIES[CAT].naam}`,
    description: firstSentence(p.desc, 155),
    alternates: { canonical: `${CATEGORIES[CAT].path}/${p.slug}` },
    openGraph: { images: [{ url: p.image.src, width: p.image.w, height: p.image.h, alt: p.title }] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(CAT, slug);
  if (!p) notFound();
  return <ProductDetail p={p} />;
}
