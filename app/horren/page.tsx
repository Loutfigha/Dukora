import type { Metadata } from 'next';
import { CATEGORIES, HORREN_GROEPEN, PRODUCTS } from '@/lib/catalogus';
import CategoryHero from '@/components/CategoryHero';
import ProductCard from '@/components/ProductCard';

const cat = CATEGORIES.horren;
export const metadata: Metadata = { title: cat.naam, description: cat.metaDescription, alternates: { canonical: cat.path } };

export default function Page() {
  return (
    <main>
      <CategoryHero crumbs={[{ label: cat.naam }]} eyebrow="Assortiment" title={cat.h1} intro={cat.intro} />
      {HORREN_GROEPEN.map((g, i) => {
        const items = PRODUCTS.filter((p) => p.cat === 'horren' && p.sub === g.sub);
        return (
          <section key={g.sub} className={i > 0 ? 'border-t border-line-2' : ''}>
            <div className="wrap py-[clamp(48px,6vw,80px)]">
              <h2 className="text-[clamp(26px,3.2vw,40px)] font-semibold tracking-[-.035em]">{g.naam}</h2>
              <div className="mt-10 grid gap-x-[clamp(24px,3vw,40px)] gap-y-14 sm:grid-cols-2 nav:grid-cols-3">
                {items.map((p) => <ProductCard key={p.slug} href={`${cat.path}/${p.slug}`} title={p.title} image={p.image} lines={p.bullets.slice(0, 2)} />)}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
