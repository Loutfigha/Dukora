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
import AdviesForm from '@/components/AdviesForm';
import HulpBand from '@/components/HulpBand';

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
      <section>
        <div className="wrap pb-[clamp(56px,7vw,112px)] pt-[clamp(40px,5vw,72px)]">
          <Breadcrumb items={[{ label: cat.naam, href: cat.path }, { label: c.title }]} />
          <div className="grid items-center gap-[clamp(32px,5vw,96px)] nav:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="label opkomst mb-6">PVC deuren · {c.title}</p>
              <h1 className="t-page opkomst">{c.title}</h1>
              <p className="lede opkomst mt-7 max-w-[36ch]" style={{ ['--i' as string]: 1 }}>{firstSentence(c.desc, 160)}</p>
              <p className="opkomst mt-5 text-[15.5px] text-steen" style={{ ['--i' as string]: 2 }}>{modelCount(c)} modellen om uit te kiezen</p>
              <div className="opkomst mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ ['--i' as string]: 2 }}>
                <TLink href="/offerte-aanvragen" track="cta_offerte_pdp" className="btn-primary px-7 py-[17px]">Vraag een offerte aan</TLink>
                <TLink href="#modellen-overzicht" className="link-cta">Bekijk alle modellen</TLink>
              </div>
            </div>
            <div className="opkomst relative aspect-[4/3] w-full bg-white" style={{ ['--i' as string]: 1 }}>
              <Image src={c.image.src} alt={c.title} fill priority sizes="(min-width:961px) 55vw, 100vw" className="object-contain p-4" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap pb-[clamp(64px,8vw,128px)]">
          <div className="grid items-start gap-[clamp(40px,6vw,110px)] nav:grid-cols-[1.15fr_1fr]">
            <div>
              <h2 className="t-section !text-[clamp(30px,3.6vw,52px)]">Over deze collectie</h2>
              <div className="mt-8"><Blocks blocks={c.desc} /></div>
            </div>
            <div className="space-y-6 nav:sticky nav:top-[120px]">
            <div className="bg-white p-[clamp(28px,3vw,48px)]">
              {c.bullets.length > 0 && (<>
                <h2 className="t-sub">Kenmerken</h2>
                <ul className="m-0 mt-6 list-none space-y-4 p-0">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-4 text-[16.5px] leading-[1.5] text-text-3"><span aria-hidden className="mt-[9px] h-[7px] w-[7px] flex-none bg-dennen" />{b}</li>
                  ))}
                </ul>
              </>)}
              {c.pdfs.length > 0 && (
                <div className="mt-9 flex flex-col items-start gap-4 border-t border-lijn pt-7">
                  {c.pdfs.map((d) => <TLink key={d.u} href={d.u} className="link-cta">{pdfLabel(d.t)}</TLink>)}
                </div>
              )}
            </div>
            <AdviesForm compact onderwerp={`de collectie ${c.title}`} titel="Vragen over deze collectie?" intro="Laat uw gegevens achter voor een gratis adviesgesprek. We bellen u binnen één werkdag." />
            </div>
          </div>
        </div>
      </section>

      <section id="modellen-overzicht" className="scroll-mt-28 bg-white">
        <div className="wrap py-[clamp(64px,8vw,128px)]">
          <h2 className="t-section !text-[clamp(30px,3.6vw,52px)] mb-10">Kies uw paneel.</h2>
          <ModelGrid variants={c.variants} />
          <p className="mt-12 max-w-[80ch] text-[13px] leading-[1.6] text-steen">Deze pagina is geen commercieel aanbod. De tekeningen dienen ter referentie; werkelijke uitvoeringen en kleuren kunnen afwijken. Welke modellen beschikbaar zijn voor uw deur, bespreken we graag met u.</p>
        </div>
      </section>

      <section>
        <div className="wrap py-[clamp(56px,7vw,104px)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="t-section !text-[clamp(28px,3.2vw,46px)]">Andere collecties</h2>
            <Link href={cat.path} className="link-cta">Alle PVC deuren</Link>
          </div>
          <ul className="m-0 mt-10 grid list-none gap-3 p-0 sm:grid-cols-2 nav:grid-cols-3">
            {andere.map((x) => (
              <li key={x.slug}><Link href={`${cat.path}/${x.slug}`} className="flex items-center justify-between border border-line-3 bg-white px-6 py-5 text-[16.5px] font-medium text-ink hover:border-ink hover:text-ink">{x.title}<span className="text-dennen" aria-hidden>→</span></Link></li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
