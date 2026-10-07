import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS, productBySlug } from '@/lib/products';
import { SITE } from '@/lib/site';
import TLink from '@/components/TLink';
import Arrow from '@/components/Arrow';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';

export const dynamicParams = false;
export const generateStaticParams = () => PRODUCTS.map((p) => ({ material: p.slug }));

export function generateMetadata({ params }: { params: { material: string } }): Metadata {
  const p = productBySlug(params.material);
  if (!p) return {};
  return {
    title: `${p.naam} laten plaatsen`,
    description: `${p.lede} ${p.intro}`.slice(0, 158).replace(/\s+\S*$/, '…'),
    alternates: { canonical: p.path },
  };
}

export default function ProductPage({ params }: { params: { material: string } }) {
  const p = productBySlug(params.material);
  if (!p) notFound();

  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
      <section className="border-b border-line-2">
        <div className="wrap pb-[clamp(40px,4vw,56px)] pt-[clamp(44px,5vw,72px)]">
          <nav aria-label="Kruimelpad" className="mb-[clamp(32px,4vw,54px)] flex gap-[10px] text-[13px] text-text-5">
            <Link href="/" className="text-text-5 hover:text-ink">Home</Link><span aria-hidden>/</span><span className="text-ink" aria-current="page">{p.naam}</span>
          </nav>
          <div className="grid items-end gap-[clamp(32px,5vw,72px)] nav:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="eyebrow">Materiaal {p.nr}</p>
              <h1 className="mt-[22px] text-[clamp(38px,6vw,78px)] font-semibold leading-none tracking-[-.045em]">{p.naam}</h1>
              <p className="lede mt-6 max-w-[520px]">{p.lede}</p>
            </div>
            <div>
              <p className="body-l">{p.intro}</p>
              <div className="mt-7 flex flex-wrap gap-[10px]">
                <TLink href="/offerte-aanvragen" track="cta_offerte_pdp" className="btn-primary gap-[9px] px-6 py-[17px] text-[15.5px]">Vraag een offerte aan<Arrow size={13} /></TLink>
                <TLink href={SITE.whatsapp} track="whatsapp_pdp" className="btn-ghost gap-[9px] px-[22px] py-[17px] text-[15.5px]">Bespreek uw situatie via WhatsApp</TLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[min(64vh,620px)] w-full bg-[#1A1D21]">
        <Photo priority placeholder="Groot beeld — woning met dit materiaal, liggend" className="!bg-[#1A1D21]" />
      </section>

      <section className="wrap py-[clamp(64px,8vw,110px)]">
        <div className="grid items-start gap-[clamp(36px,5vw,80px)] nav:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">Voordelen</p>
            <h2 className="mt-5 text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.04] tracking-[-.04em]">Waarom klanten hiervoor kiezen.</h2>
            <ul className="m-0 mt-8 list-none border-t border-line p-0">
              {p.vw.map((v) => (
                <li key={v} className="flex gap-[14px] border-b border-line py-[18px] text-[16.5px] leading-[1.5] text-text-2"><span aria-hidden className="font-bold text-accent">✓</span>{v}</li>
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
            <p className="mt-[18px] text-xs leading-[1.6] text-text-5">Waarden tussen [ ] vult u aan met uw eigen leverancierdata.</p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line-2 bg-paper-2">
        <div className="wrap py-[clamp(64px,7vw,100px)]">
          <div className="grid items-center gap-[clamp(28px,4vw,56px)] nav:grid-cols-2">
            <Photo aspect="aspect-[5/4]" placeholder="Detail — profiel, hoekverbinding of hang- en sluitwerk" sizes="(min-width:961px) 50vw, 100vw" />
            <div>
              <p className="eyebrow">Montage</p>
              <h2 className="mt-5 text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.06] tracking-[-.035em]">Onze eigen monteurs, geen onderaannemers.</h2>
              <p className="body-l mt-[22px]">Het oude kozijn eruit, het nieuwe kierdicht erin, aansluitingen afgewerkt en het afval mee. U krijgt vooraf te horen welke dagen we komen en met hoeveel mensen. Aan het eind lopen we samen alles na.</p>
              <div className="mt-[26px] flex flex-wrap gap-x-[26px] gap-y-[10px]">
                {['Stofarm werken', 'Afval nemen we mee', 'Garantie op papier'].map((t) => (
                  <span key={t} className="text-[14.5px] font-medium text-text-2"><span aria-hidden>✓&nbsp; </span>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="veelgestelde-vragen" className="wrap scroll-mt-24 py-[clamp(64px,8vw,110px)]">
        <div className="grid items-start gap-[clamp(32px,5vw,72px)] nav:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Veelgestelde vragen</p>
            <h2 className="mt-5 text-[clamp(26px,3.4vw,42px)] font-semibold leading-[1.04] tracking-[-.04em]">Wat klanten ons vragen.</h2>
            <p className="mt-5 text-base leading-[1.6] text-text-4b">Staat uw vraag er niet bij? Stuur een bericht via WhatsApp, dan krijgt u meestal dezelfde dag antwoord.</p>
          </div>
          <div className="border-t border-line">
            {p.faq.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none justify-between gap-4 py-[22px] text-[18px] font-semibold tracking-[-.02em] hover:text-accent">
                  {f.q}<span aria-hidden className="font-normal text-accent group-open:hidden">+</span><span aria-hidden className="hidden font-normal text-accent group-open:inline">−</span>
                </summary>
                <p className="-mt-1 pb-6 pr-[60px] text-base leading-[1.62] text-text-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
