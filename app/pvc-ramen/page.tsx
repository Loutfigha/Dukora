import type { Metadata } from 'next';
import { CATEGORIES, productsIn } from '@/lib/catalogus';
import CategoryHero from '@/components/CategoryHero';
import Voordelen from '@/components/Voordelen';
import HulpBand from '@/components/HulpBand';
import ProductCard from '@/components/ProductCard';

const cat = CATEGORIES['pvc-ramen'];
export const metadata: Metadata = { title: cat.naam, description: cat.metaDescription, alternates: { canonical: cat.path } };

export default function Page() {
  return (
    <main>
      <CategoryHero crumbs={[{ label: cat.naam }]} eyebrow="Assortiment" title={cat.h1} intro={cat.intro} />
      <Voordelen border={false} />
      <section className="bg-white"><div className="wrap py-[clamp(64px,8vw,120px)]">
        <div className="grid gap-x-[clamp(24px,3.4vw,56px)] gap-y-16 sm:grid-cols-2 nav:grid-cols-3">
          {productsIn('pvc-ramen').map((p) => (
            <ProductCard key={p.slug} href={`${cat.path}/${p.slug}`} title={p.title} image={p.image} lines={p.bullets.slice(0, 3)} />
          ))}
        </div>
      </div></section>
      <HulpBand />
    </main>
  );
}
