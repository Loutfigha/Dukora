import type { Metadata } from 'next';
import { CATEGORIES, productsIn } from '@/lib/catalogus';
import CategoryHero from '@/components/CategoryHero';
import ProductCard from '@/components/ProductCard';

const cat = CATEGORIES['pvc-schuifsystemen'];
export const metadata: Metadata = { title: cat.naam, description: cat.metaDescription, alternates: { canonical: cat.path } };

export default function Page() {
  return (
    <main>
      <CategoryHero crumbs={[{ label: cat.naam }]} eyebrow="Assortiment" title={cat.h1} intro={cat.intro} />
      <section className="wrap py-[clamp(56px,7vw,96px)]">
        <div className="grid gap-x-[clamp(24px,3vw,40px)] gap-y-14 sm:grid-cols-2 nav:grid-cols-3">
          {productsIn('pvc-schuifsystemen').map((p) => (
            <ProductCard key={p.slug} href={`${cat.path}/${p.slug}`} title={p.title} image={p.image} lines={p.bullets.slice(0, 2)} />
          ))}
        </div>
      </section>
    </main>
  );
}
