import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES, firstSentence, pdfLabel, productsIn, type Product } from '@/lib/catalogus';
import { SITE } from '@/lib/site';
import TLink from './TLink';
import Arrow from './Arrow';
import Blocks from './Blocks';
import Reveal from './Reveal';
import JsonLd from './JsonLd';
import ProductCard from './ProductCard';
import { Breadcrumb } from './CategoryHero';

const DISCLAIMER = 'Deze pagina is geen commercieel aanbod. Het getoonde beeldmateriaal dient ter referentie; werkelijke kleuren en texturen kunnen afwijken. Renderings tonen voorbeelden van profiel- en beglazingscombinaties.';

export default function ProductDetail({ p }: { p: Product }) {
  const cat = CATEGORIES[p.cat];
  const lede = firstSentence(p.desc, 150);
  const rest = p.desc.slice(p.desc.findIndex((b) => b.t === 'p') + 1);
  const meer = productsIn(p.cat).filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <main>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Product', name: p.title, description: firstSentence(p.desc, 300), image: `${SITE.url}${p.image.src}`, category: cat.naam, brand: { '@type': 'Brand', name: 'Dukora' } }} />
      <section className="border-b border-line-2">
        <div className="wrap pb-[clamp(40px,4vw,56px)] pt-[clamp(44px,5vw,72px)]">
          <Breadcrumb items={[{ label: cat.naam, href: cat.path }, { label: p.title }]} />
          <div className="grid items-center gap-[clamp(32px,5vw,72px)] nav:grid-cols-2">
            <div>
              <p className="eyebrow">{cat.naam}</p>
              <h1 className="mt-[22px] text-[clamp(38px,6vw,78px)] font-semibold leading-none tracking-[-.045em]">{p.title}</h1>
              {lede && <p className="lede mt-6 max-w-[520px]">{lede}</p>}
              <div className="mt-8 flex flex-wrap gap-[10px]">
                <TLink href="/offerte-aanvragen" track="cta_offerte_pdp" className="btn-primary gap-[9px] px-6 py-[17px] text-[15.5px]">Vraag een offerte aan<Arrow size={13} /></TLink>
                <TLink href={SITE.whatsapp} track="whatsapp_pdp" className="btn-ghost gap-[9px] px-[22px] py-[17px] text-[15.5px]">Stel uw vraag via WhatsApp</TLink>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
              <Image src={p.image.src} alt={p.title} fill priority sizes="(min-width:961px) 50vw, 100vw" className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {p.numbers.length > 0 && (
        <section className="bg-ink text-white">
          <div className="wrap py-[clamp(40px,5vw,64px)]">
            <div className="grid border-t border-white/[.16]" style={{ gridTemplateColumns: `repeat(auto-fit,minmax(180px,1fr))` }}>
              {p.numbers.map((k, i) => (
                <div key={k.l + i} className="border-white/[.13] pb-2 pt-7 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0">
                  <p className="text-[clamp(34px,4vw,52px)] font-semibold leading-none tracking-[-.05em]">{k.n}</p>
                  <p className="mt-3 text-[14px] leading-[1.45] text-white/[.62]">{k.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="wrap py-[clamp(64px,8vw,110px)]">
        <div className="grid items-start gap-[clamp(36px,5vw,80px)] nav:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="eyebrow">Over dit product</p>
            <h2 className="mt-5 text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.04] tracking-[-.04em]">{p.title}</h2>
            <div className="mt-7"><Blocks blocks={rest.length ? [p.desc[0], ...rest] : p.desc} /></div>
          </Reveal>
          <Reveal>
            {p.bullets.length > 0 && (<>
              <p className="eyebrow">Kenmerken</p>
              <ul className="m-0 mt-5 list-none border-t border-line p-0">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-[14px] border-b border-line py-[16px] text-[16.5px] leading-[1.5] text-text-2"><span aria-hidden className="font-bold text-accent">✓</span>{b}</li>
                ))}
              </ul>
            </>)}
            {p.pdfs.length > 0 && (
              <div className="mt-8 flex flex-col items-start gap-4">
                {p.pdfs.map((d) => <TLink key={d.u} href={d.u} className="link-cta">{pdfLabel(d.t)}<Arrow size={13} /></TLink>)}
              </div>
            )}
          </Reveal>
        </div>

        {p.colors.length > 0 && (
          <Reveal className="mt-[clamp(48px,6vw,80px)] border-t border-line pt-10">
            <p className="eyebrow">Beschikbare kleuren</p>
            <ul className="m-0 mt-6 grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fill,minmax(96px,1fr))]">
              {p.colors.map((c) => (
                <li key={c.name} className="text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.name} width={96} height={96} loading="lazy" className="mx-auto h-[72px] w-[72px] border border-line object-cover" />
                  <span className="mt-2 block text-[12.5px] leading-[1.35] text-text-4b">{c.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <p className="mt-[clamp(40px,5vw,64px)] border-t border-line pt-6 text-xs leading-[1.6] text-text-5">{DISCLAIMER}</p>
      </section>

      {meer.length > 0 && (
        <section className="border-t border-line-2 bg-paper-2">
          <div className="wrap py-[clamp(56px,6vw,88px)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[clamp(24px,3vw,36px)] font-semibold tracking-[-.035em]">Bekijk ook</h2>
              <Link href={cat.path} className="text-[15px] font-semibold text-accent">Alle {cat.naam.toLowerCase()} →</Link>
            </div>
            <div className="mt-8 grid gap-[clamp(24px,3vw,40px)] sm:grid-cols-2 nav:grid-cols-3">
              {meer.map((m) => <ProductCard key={m.slug} href={`${cat.path}/${m.slug}`} title={m.title} image={m.image} lines={m.bullets.slice(0, 2)} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
