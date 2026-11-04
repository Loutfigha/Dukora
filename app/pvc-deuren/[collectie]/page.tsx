import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, DEUREN, collectieBySlug, firstSentence, modelCount, pdfLabel } from '@/lib/catalogus';
import { SITE } from '@/lib/site';
import TLink from '@/components/TLink';
import Arrow from '@/components/Arrow';
import Blocks from '@/components/Blocks';
import ModelGrid from '@/components/ModelGrid';
import JsonLd from '@/components/JsonLd';
import { Breadcrumb } from '@/components/CategoryHero';

const cat = CATEGORIES['pvc-deuren'];
export const dynamicParams = false;
export const generateStaticParams = () => DEUREN.map((c) => ({ collectie: c.slug }));

export function generateMetadata({ params }: { params: { collectie: string } }): Metadata {
  const c = collectieBySlug(params.collectie);
  if (!c) return {};
  return {
    title: `${c.title} — PVC deuren`,
    description: `${firstSentence(c.desc, 120)} Bekijk alle ${modelCount(c)} modellen.`.trim(),
    alternates: { canonical: `${cat.path}/${c.slug}` },
    openGraph: { images: [{ url: c.image.src, width: c.image.w, height: c.image.h, alt: c.title }] },
  };
}

export default function Page({ params }: { params: { collectie: string } }) {
  const c = collectieBySlug(params.collectie);
  if (!c) notFound();
  const andere = DEUREN.filter((x) => x.slug !== c.slug);

  return (
    <main>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Product', name: c.title, description: firstSentence(c.desc, 300), image: `${SITE.url}${c.image.src}`, category: 'PVC deuren', brand: { '@type': 'Brand', name: 'Dukora' } }} />
      <section className="border-b border-line-2">
        <div className="wrap pb-[clamp(40px,4vw,56px)] pt-[clamp(44px,5vw,72px)]">
          <Breadcrumb items={[{ label: cat.naam, href: cat.path }, { label: c.title }]} />
          <div className="grid items-center gap-[clamp(32px,5vw,72px)] nav:grid-cols-2">
            <div>
              <p className="eyebrow">PVC deuren · {modelCount(c)} modellen</p>
              <h1 className="mt-[22px] text-[clamp(38px,6vw,78px)] font-semibold leading-none tracking-[-.045em]">{c.title}</h1>
              <p className="lede mt-6 max-w-[520px]">{firstSentence(c.desc, 160)}</p>
              <div className="mt-8 flex flex-wrap gap-[10px]">
                <TLink href="/offerte-aanvragen" track="cta_offerte_pdp" className="btn-primary gap-[9px] px-6 py-[17px] text-[15.5px]">Vraag een offerte aan<Arrow size={13} /></TLink>
                <TLink href="#modellen-overzicht" className="btn-ghost gap-[9px] px-[22px] py-[17px] text-[15.5px]">Bekijk alle modellen</TLink>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
              <Image src={c.image.src} alt={c.title} fill priority sizes="(min-width:961px) 50vw, 100vw" className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-[clamp(56px,7vw,96px)]">
        <div className="grid items-start gap-[clamp(36px,5vw,80px)] nav:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow">Over deze collectie</p>
            <div className="mt-6"><Blocks blocks={c.desc} /></div>
          </div>
          <div>
            {c.bullets.length > 0 && (<>
              <p className="eyebrow">Kenmerken</p>
              <ul className="m-0 mt-5 list-none border-t border-line p-0">
                {c.bullets.map((b) => (
                  <li key={b} className="flex gap-[14px] border-b border-line py-[16px] text-[16.5px] leading-[1.5] text-text-2"><span aria-hidden className="font-bold text-accent">✓</span>{b}</li>
                ))}
              </ul>
            </>)}
            {c.pdfs.length > 0 && (
              <div className="mt-8 flex flex-col items-start gap-4">
                {c.pdfs.map((d) => <TLink key={d.u} href={d.u} className="link-cta">{pdfLabel(d.t)}<Arrow size={13} /></TLink>)}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="modellen-overzicht" className="scroll-mt-24 border-t border-line-2 bg-paper-2">
        <div className="wrap py-[clamp(56px,7vw,96px)]">
          <p className="eyebrow">Alle modellen</p>
          <h2 className="mb-10 mt-5 text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.04] tracking-[-.04em]">Kies uw paneel.</h2>
          <ModelGrid variants={c.variants} />
          <p className="mt-10 text-xs leading-[1.6] text-text-5">Deze pagina is geen commercieel aanbod. De tekeningen dienen ter referentie; werkelijke uitvoeringen en kleuren kunnen afwijken. Welke modellen beschikbaar zijn voor uw deur, bespreken we graag met u.</p>
        </div>
      </section>

      <section className="border-t border-line-2">
        <div className="wrap py-[clamp(56px,6vw,88px)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(24px,3vw,36px)] font-semibold tracking-[-.035em]">Andere collecties</h2>
            <Link href={cat.path} className="text-[15px] font-semibold text-accent">Alle PVC deuren →</Link>
          </div>
          <ul className="m-0 mt-8 grid list-none gap-3 p-0 sm:grid-cols-2 nav:grid-cols-3">
            {andere.map((x) => (
              <li key={x.slug}><Link href={`${cat.path}/${x.slug}`} className="flex items-center justify-between border border-line-3 bg-field px-[18px] py-4 text-[15.5px] font-medium text-ink hover:border-[#B7AE9F] hover:text-ink">{x.title}<span className="text-accent" aria-hidden>→</span></Link></li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
