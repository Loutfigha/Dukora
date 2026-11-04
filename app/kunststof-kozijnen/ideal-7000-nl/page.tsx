import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { IDEAL_7000_NL as p } from '@/lib/profielen';
import { SITE } from '@/lib/site';
import TLink from '@/components/TLink';
import Arrow from '@/components/Arrow';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: `${p.naam} — KOMO-gecertificeerd kunststof kozijn`,
  description: `${p.naam}: kunststof kozijnprofiel met aanslag, inbouwdiepte 120 mm, Uw vanaf 0,76 W/m²K, KOMO-certificaat en RC2. Beschikbaar in crème, wit en antraciet.`,
  alternates: { canonical: p.path },
  openGraph: { images: [{ url: p.afbeelding.src, width: 920, height: 690, alt: p.afbeelding.alt }] },
};

export default function Ideal7000NL() {
  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: p.naam,
          description: p.tagline,
          image: `${SITE.url}${p.afbeelding.src}`,
          category: 'Kunststof kozijnen',
          brand: { '@type': 'Brand', name: 'Dukora' },
        }}
      />

      <section className="border-b border-line-2">
        <div className="wrap pb-[clamp(40px,4vw,56px)] pt-[clamp(44px,5vw,72px)]">
          <nav aria-label="Kruimelpad" className="mb-[clamp(32px,4vw,54px)] flex flex-wrap gap-[10px] text-[13px] text-text-5">
            <Link href="/" className="text-text-5 hover:text-ink">Home</Link><span aria-hidden>/</span>
            <Link href={p.parent.path} className="text-text-5 hover:text-ink">{p.parent.naam}</Link><span aria-hidden>/</span>
            <span className="text-ink" aria-current="page">{p.naam}</span>
          </nav>
          <div className="grid items-center gap-[clamp(32px,5vw,72px)] nav:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">Kunststof profiel</p>
              <h1 className="mt-[22px] text-[clamp(38px,6vw,78px)] font-semibold leading-none tracking-[-.045em]">{p.naam}</h1>
              <p className="lede mt-6 max-w-[520px]">{p.tagline}</p>
              <ul className="m-0 mt-7 flex list-none flex-wrap gap-x-[26px] gap-y-[10px] p-0">
                {['KOMO-certificaat', 'RC2 inbraakwerend', 'Uw vanaf 0,76'].map((t) => (
                  <li key={t} className="text-[14.5px] font-medium text-text-2"><span aria-hidden className="text-accent">✓&nbsp; </span>{t}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-[10px]">
                <TLink href="/offerte-aanvragen" track="cta_offerte_pdp" className="btn-primary gap-[9px] px-6 py-[17px] text-[15.5px]">Vraag een offerte aan<Arrow size={13} /></TLink>
                <TLink href={SITE.whatsapp} track="whatsapp_pdp" className="btn-ghost gap-[9px] px-[22px] py-[17px] text-[15.5px]">Stel uw vraag via WhatsApp</TLink>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
              <Image src={p.afbeelding.src} alt={p.afbeelding.alt} fill priority sizes="(min-width:961px) 50vw, 100vw" className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="wrap py-[clamp(40px,5vw,64px)]">
          <div className="grid grid-cols-2 border-t border-white/[.16] nav:grid-cols-4">
            {p.kerncijfers.map((k, i) => (
              <div key={k.label} className={`pb-2 pt-7 ${i % 2 === 0 ? 'pr-5' : 'pl-5'} nav:px-7 nav:first:pl-0 nav:last:pr-0 ${i < p.kerncijfers.length - 1 ? 'nav:border-r nav:border-white/[.13]' : ''} ${i === 1 ? 'max-nav:border-l max-nav:border-white/[.13]' : ''}`}>
                <p className="text-[clamp(34px,4vw,52px)] font-semibold leading-none tracking-[-.05em]">{k.waarde}</p>
                <p className="mt-3 text-[14px] leading-[1.45] text-white/[.62]">{k.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-[clamp(64px,8vw,110px)]">
        <div className="grid items-start gap-[clamp(36px,5vw,80px)] nav:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Over dit profiel</p>
            <h2 className="mt-5 text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.04] tracking-[-.04em]">Gemaakt voor de Nederlandse markt.</h2>
            <div className="mt-7 space-y-5">
              {p.beschrijving.map((t) => <p key={t} className="body-l">{t}</p>)}
            </div>
            <ul className="m-0 mt-8 list-none border-t border-line p-0">
              {p.voordelen.map((v) => (
                <li key={v} className="flex gap-[14px] border-b border-line py-[16px] text-[16.5px] leading-[1.5] text-text-2"><span aria-hidden className="font-bold text-accent">✓</span>{v}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Specificaties</p>
            <dl className="m-0 mt-5 border-t border-line">
              {p.specs.map((s) => (
                <div key={s.k} className="grid gap-4 border-b border-line py-[18px] sm:grid-cols-[170px_1fr]">
                  <dt className="text-sm font-semibold tracking-[.02em] text-text-4b">{s.k}</dt>
                  <dd className="m-0 text-base leading-[1.5]">{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 eyebrow">Beschikbare kernkleuren</p>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-3 p-0">
              {p.kernkleuren.map((k) => (
                <li key={k} className="border border-line-3 bg-field px-[18px] py-[14px] text-[15px] font-medium">{k}</li>
              ))}
            </ul>
            {p.catalogus && (
              <TLink href={p.catalogus} className="link-cta mt-8">Download de productcatalogus (PDF)<Arrow size={13} /></TLink>
            )}
          </Reveal>
        </div>
        <div className="mt-[clamp(40px,5vw,64px)] space-y-2 border-t border-line pt-6">
          {p.voetnoot.map((t) => <p key={t} className="text-xs leading-[1.6] text-text-5">{t}</p>)}
        </div>
      </section>
    </main>
  );
}
