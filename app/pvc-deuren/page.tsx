import type { Metadata } from 'next';
import { CATEGORIES, DEUREN, firstSentence, modelCount } from '@/lib/catalogus';
import CategoryHero from '@/components/CategoryHero';
import ProductCard from '@/components/ProductCard';

const cat = CATEGORIES['pvc-deuren'];
export const metadata: Metadata = { title: cat.naam, description: cat.metaDescription, alternates: { canonical: cat.path } };

export default function Page() {
  return (
    <main>
      <CategoryHero crumbs={[{ label: cat.naam }]} eyebrow="Assortiment" title={cat.h1} intro={cat.intro} />
      <section className="bg-white"><div className="wrap py-[clamp(64px,8vw,120px)]">
        <div className="grid gap-x-[clamp(24px,3.4vw,56px)] gap-y-16 sm:grid-cols-2 nav:grid-cols-3">
          {DEUREN.map((c) => (
            <ProductCard
              key={c.slug}
              href={`${cat.path}/${c.slug}`}
              title={c.title}
              image={c.image}
              lines={[firstSentence(c.desc, 120), `${modelCount(c)} modellen`].filter(Boolean)}
              cta="Bekijk alle modellen"
            />
          ))}
        </div>
      </div></section>
    </main>
  );
}
