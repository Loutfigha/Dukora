import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES, firstSentence, pdfLabel, productsIn, type Product } from '@/lib/catalogus';
import { SITE } from '@/lib/site';
import TLink from './TLink';
import Blocks from './Blocks';
import JsonLd from './JsonLd';
import ProductCard from './ProductCard';
import { Breadcrumb } from './CategoryHero';

const DISCLAIMER = 'Deze pagina is geen commercieel aanbod. Het getoonde beeldmateriaal dient ter referentie; werkelijke kleuren en texturen kunnen afwijken. Renderings tonen voorbeelden van profiel- en beglazingscombinaties.';

export default function ProductDetail({ p }: { p: Product }) {
  const cat = CATEGORIES[p.cat];
  const lede = firstSentence(p.desc, 150);
  const meer = productsIn(p.cat).filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <main>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Product', name: p.title, description: firstSentence(p.desc, 300), image: `${SITE.url}${p.image.src}`, category: cat.naam, brand: { '@type': 'Brand', name: 'Dukora' } }} />
      <section>
        <div className="wrap pb-[clamp(56px,7vw,112px)] pt-[clamp(40px,5vw,72px)]">
          <Breadcrumb items={[{ label: cat.naam, href: cat.path }, { label: p.title }]} />
          <div className="grid items-center gap-[clamp(32px,5vw,96px)] nav:grid-cols-[1fr_1.1fr]">
            <div>
              <h1 className="t-page opkomst">{p.title}</h1>
              {lede && <p className="lede opkomst mt-7 max-w-[36ch]" style={{ ['--i' as string]: 1 }}>{lede}</p>}
              <div className="opkomst mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ ['--i' as string]: 2 }}>
                <TLink href="/offerte-aanvragen" track="cta_offerte_pdp" className="btn-primary px-7 py-[17px]">Vraag een offerte aan</TLink>
                <TLink href={SITE.whatsapp} track="whatsapp_pdp" className="link-cta">Stel uw vraag via WhatsApp</TLink>
              </div>
            </div>
            <div className="opkomst relative aspect-[4/3] w-full bg-white" style={{ ['--i' as string]: 1 }}>
              <Image src={p.image.src} alt={p.title} fill priority sizes="(min-width:961px) 55vw, 100vw" className="object-contain p-4" />
            </div>
          </div>
        </div>
      </section>

      {p.numbers.length > 0 && (
        <section className="bg-white">
          <div className="wrap py-[clamp(48px,6vw,88px)]">
            <dl className="m-0 grid gap-x-10 gap-y-10" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))' }}>
              {p.numbers.map((k, i) => (
                <div key={k.l + i}>
                  <dt className="display text-[clamp(44px,5vw,76px)] leading-none">{k.n}</dt>
                  <dd className="m-0 mt-3 max-w-[22ch] text-[15px] leading-[1.45] text-steen">{k.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section>
        <div className="wrap py-[clamp(64px,8vw,128px)]">
          <div className="grid items-start gap-[clamp(40px,6vw,110px)] nav:grid-cols-[1.15fr_1fr]">
            <div>
              <h2 className="t-section !text-[clamp(30px,3.6vw,52px)]">Over dit product</h2>
              <div className="mt-8"><Blocks blocks={p.desc} /></div>
            </div>
            <div className="bg-white p-[clamp(28px,3vw,48px)]">
              {p.bullets.length > 0 && (<>
                <h2 className="t-sub">Kenmerken</h2>
                <ul className="m-0 mt-6 list-none space-y-4 p-0">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-4 text-[16.5px] leading-[1.5] text-text-3"><span aria-hidden className="mt-[9px] h-[7px] w-[7px] flex-none bg-dennen" />{b}</li>
                  ))}
                </ul>
              </>)}
              {p.pdfs.length > 0 && (
                <div className="mt-9 flex flex-col items-start gap-4 border-t border-lijn pt-7">
                  {p.pdfs.map((d) => <TLink key={d.u} href={d.u} className="link-cta">{pdfLabel(d.t)}</TLink>)}
                </div>
              )}
            </div>
          </div>

          {p.colors.length > 0 && (
            <div className="mt-[clamp(56px,7vw,112px)]">
              <h2 className="t-sub">Beschikbare kleuren</h2>
              <ul className="m-0 mt-8 grid list-none gap-x-4 gap-y-6 p-0 [grid-template-columns:repeat(auto-fill,minmax(92px,1fr))]">
                {p.colors.map((c) => (
                  <li key={c.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={c.name} width={96} height={96} loading="lazy" className="h-[76px] w-[76px] border border-ink/10 object-cover" />
                    <span className="mt-2 block text-[13px] leading-[1.35] text-steen">{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-[clamp(48px,6vw,88px)] max-w-[80ch] text-[13px] leading-[1.6] text-steen">{DISCLAIMER}</p>
        </div>
      </section>

      {meer.length > 0 && (
        <section className="bg-white">
          <div className="wrap py-[clamp(64px,8vw,120px)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="t-section !text-[clamp(30px,3.6vw,52px)]">Bekijk ook</h2>
              <Link href={cat.path} className="link-cta">Alle {cat.naam.toLowerCase()}</Link>
            </div>
            <div className="mt-12 grid gap-x-[clamp(24px,3vw,48px)] gap-y-12 sm:grid-cols-2 nav:grid-cols-3">
              {meer.map((m) => <ProductCard key={m.slug} href={`${cat.path}/${m.slug}`} title={m.title} image={m.image} lines={m.bullets.slice(0, 2)} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
