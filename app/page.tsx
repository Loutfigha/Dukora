import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import TLink from '@/components/TLink';
import Arrow from '@/components/Arrow';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import BeforeAfter from '@/components/BeforeAfter';
import JsonLd from '@/components/JsonLd';
import Image from 'next/image';
import { CATEGORIES, DEUREN, productBySlug } from '@/lib/catalogus';

export const metadata: Metadata = {
  title: { absolute: 'Dukora — PVC ramen, deuren, schuifsystemen en horren | Heel Nederland' },
  description: SITE.description,
  alternates: { canonical: '/' },
};

const KPIS = [
  { n: '15', unit: ' jaar', label: 'Ervaring met kozijnen en montage' },
  { n: '[X]+', label: 'Projecten gerealiseerd' },
  { n: '[X]', unit: ' jaar', label: 'Garantie op product en montage' },
  { n: '[X,X]', label: 'Gemiddelde beoordeling van klanten' },
];

const WAAROM = [
  ['Betere isolatie', 'Kierdicht geplaatst, met HR++ of triple glas.'],
  ['Lagere energiekosten', 'Minder warmteverlies, lagere stookkosten.'],
  ['Meer comfort', 'Geen koudeval bij het raam, minder straatgeluid.'],
  ['Minder onderhoud', 'Schoonmaken is genoeg. Geen schilderwerk.'],
  ['Verbeterde uitstraling', 'Slankere profielen, meer glas, rustiger gevel.'],
  ['Meerwaarde', 'Een beter energielabel telt mee bij verkoop.'],
];

const ASSORTIMENT = [
  { cat: 'pvc-ramen', slug: 'ideal-7000-nl', nr: '01', tekst: 'KOMO-gecertificeerd, warm en stil. De Ideal 7000 NL is ontwikkeld voor de Nederlandse markt.' },
  { cat: 'pvc-deuren', slug: 'model-pvc-deuren', nr: '02', tekst: 'Buitendeuren in zes collecties en honderden modellen, passend bij uw ramen en uw gevel.' },
  { cat: 'pvc-schuifsystemen', slug: 'synego-slide', nr: '03', tekst: 'Vijftien PVC schuifsystemen voor veel daglicht, soepele bediening en goede isolatie.' },
  { cat: 'horren', slug: 'jolly', nr: '04', tekst: 'Vaste en uitschuifbare horren en deurklamboes, zodat de ramen open kunnen en insecten buiten blijven.' },
] as const;

const STAPPEN = [
  ['Advies', 'We bespreken uw woning, wensen en mogelijkheden. Zonder verkoper aan de deur.'],
  ['Inmeten', 'Onze specialist komt bij u langs en meet elk kozijn zelf op.'],
  ['Offerte', 'U ontvangt een transparante offerte: materiaal, glas, montage en afwerking.'],
  ['Productie', 'Uw kozijnen worden op maat geproduceerd. U hoort wanneer ze klaarstaan.'],
  ['Montage', 'Onze eigen monteurs plaatsen de kozijnen en werken alles netjes af.'],
  ['Oplevering', 'We lopen alles samen na, ruimen op en laten de garantie op papier achter.'],
];

const REVIEWS = [
  'Van eerste gesprek tot montage uitstekend geholpen. De kozijnen zijn prachtig geworden.',
  'We hadden drie offertes liggen. Dit was de enige partij die eerst naar het huis kwam kijken en daarna pas een prijs gaf.',
  'Montage in twee dagen klaar, alles zelf opgeruimd. Het verschil in geluid van de straat is groter dan we hadden verwacht.',
];

const VERWACHTING = [
  ['Eigen montageteams', 'Geen onderaannemers die u nooit eerder zag.'],
  ['Advies, geen verkoop', 'Een specialist die meet en meedenkt, geen deurverkoper.'],
  ['Alles in eigen beheer', 'Van productie tot montage bij één partij.'],
  ['Scherpe levertijd', 'Een planning die staat, en die we nakomen.'],
  ['Isolatie die telt', 'Profiel en glas gekozen op uw energiedoel.'],
];

export default function Home() {
  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HomeAndConstructionBusiness',
          name: 'Dukora',
          url: SITE.url,
          telephone: SITE.phone,
          email: SITE.email,
          areaServed: 'NL',
          description: SITE.description,
        }}
      />

      {/* 1. Hero */}
      <section className="relative flex min-h-[min(92vh,900px)] items-end overflow-hidden bg-ink-deep">
        <div className="absolute inset-0">
          <Photo priority quiet src="/img/foto/hero-woning.webp" alt="Moderne vrijstaande woning met grote ramen en een groen gazon" placeholder="Hero" className="!bg-ink-deep" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,14,.92)_0%,rgba(10,12,14,.72)_46%,rgba(10,12,14,.32)_100%)]" />
        <div className="wrap relative pb-[68px]">
          <div className="max-w-[760px]">
            <p className="eyebrow-dark mb-[26px]">Kozijnen &amp; montage · Heel Nederland</p>
            <h1 className="text-[clamp(40px,7.2vw,90px)] font-semibold leading-[.98] tracking-[-.045em] text-white">Nieuwe kozijnen.<br />Een beter huis.</h1>
            <p className="mt-[26px] max-w-[560px] text-[clamp(17px,2vw,20px)] leading-[1.55] text-white/[.82]">PVC ramen, deuren, schuifsystemen en horren — ingemeten, gemaakt en geplaatst door onze eigen mensen. Beter geïsoleerd, stiller in huis en jaren zonder onderhoud.</p>
            <div className="mt-[38px] flex flex-wrap gap-3">
              <TLink href="/offerte-aanvragen" track="cta_offerte_hero" className="btn-primary-dark px-7 py-[19px] text-base">Vraag een vrijblijvende offerte aan<Arrow /></TLink>
              <TLink href={SITE.whatsapp} track="whatsapp_hero" className="btn-ghost-dark px-[26px] py-[19px] text-base">WhatsApp ons</TLink>
            </div>
            <ul className="m-0 mt-10 flex list-none flex-wrap gap-x-[30px] gap-y-[10px] p-0">
              {['Persoonlijk advies', 'Eigen montageteams', 'Hoogwaardige materialen', 'Vrijblijvende offerte'].map((t) => (
                <li key={t} className="flex items-center gap-[9px] text-[14.5px] font-medium text-white/80"><span aria-hidden className="text-accent-light">✓</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Vertrouwen */}
      <section className="bg-ink text-white">
        <div className="wrap py-[74px]">
          <h2 className="max-w-[620px] text-[clamp(24px,3vw,34px)] font-semibold leading-[1.1] tracking-[-.03em]">Duizenden woningen gingen u voor.</h2>
          <div className="mt-[52px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-t border-white/[.16]">
            {KPIS.map((k, i) => (
              <div key={k.label} className={`pb-[6px] pt-8 ${i === 0 ? 'pr-7' : i === KPIS.length - 1 ? 'pl-7' : 'px-7'} ${i < KPIS.length - 1 ? 'nav:border-r nav:border-white/[.13]' : ''}`}>
                <p className="text-[clamp(46px,5.4vw,68px)] font-semibold leading-none tracking-[-.05em]">
                  {k.n}{k.unit && <span className="text-[.42em] font-medium tracking-[-.02em]">{k.unit}</span>}
                </p>
                <p className="mt-[14px] text-[14.5px] text-white/[.62]">{k.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Waarom nieuwe kozijnen */}
      <section className="wrap py-[clamp(72px,9vw,124px)]">
        <div className="grid items-start gap-[clamp(40px,6vw,90px)] nav:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">Waarom nieuwe kozijnen</p>
            <h2 className="h2-xl mt-6">Het verschil merkt u de eerste winter.</h2>
            <p className="mt-[26px] max-w-[460px] text-[17.5px] leading-[1.62] text-text-3">Oude kozijnen laten warmte, geluid en vocht door. Met goede profielen en HR++ of triple glas blijft de warmte binnen, zakt uw energierekening en is het merkbaar stiller in huis. Daarbij staat de woning er direct anders van.</p>
            <div className="my-[34px] mb-[30px] h-px max-w-[460px] bg-line" />
            <TLink href="/offerte-aanvragen" track="cta_offerte_waarom" className="link-cta">Bekijk wat het voor uw woning betekent<Arrow size={13} /></TLink>
          </Reveal>
          <Reveal>
            <Photo aspect="aspect-[4/3]" src="/img/foto/ramen-interieur.webp" alt="Ramen met donkere kozijnen van binnenuit gezien, met daglicht en gordijnen" placeholder="Detailfoto — kozijn van binnenuit, daglicht" sizes="(min-width:961px) 50vw, 100vw" />
            <ol className="m-0 mt-[34px] grid list-none grid-cols-1 border-t border-line p-0 sm:grid-cols-2">
              {WAAROM.map(([t, s], i) => (
                <li key={t} className={`flex gap-[14px] border-b border-line py-[22px] ${i % 2 === 0 ? 'sm:border-r sm:pr-6' : 'sm:pl-6'}`}>
                  <span className="pt-1 text-xs font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <strong className="text-[16.5px] font-semibold tracking-[-.02em]">{t}</strong><br />
                    <span className="text-[14.5px] leading-[1.5] text-text-4b">{s}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 4. Assortiment */}
      <section className="border-t border-line-2">
        <div className="wrap pt-[clamp(64px,7vw,96px)]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Assortiment</p>
              <h2 className="h2-xl mt-[22px] max-w-[640px]">Vier productgroepen. Eén manier van werken.</h2>
            </div>
            <p className="max-w-[340px] text-[16.5px] leading-[1.6] text-text-4b">Welk systeem past bij uw woning hangt af van de gevel, de sponning die er nu zit en wat u wilt vervangen. Daar kijken we bij u thuis naar.</p>
          </div>
        </div>
        <div className="wrap pb-[clamp(72px,8vw,110px)] pt-[clamp(48px,5vw,72px)]">
          <div className="grid gap-[clamp(24px,3vw,40px)] sm:grid-cols-2 nav:grid-cols-4">
            {ASSORTIMENT.map((a) => {
              const cat = CATEGORIES[a.cat];
              const img = a.cat === 'pvc-deuren' ? DEUREN.find((d) => d.slug === a.slug)!.image : productBySlug(a.cat, a.slug)!.image;
              return (
                <Reveal key={a.cat}>
                  <Link href={cat.path} className="group block text-ink hover:text-ink">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                      <Image src={img.src} alt={cat.naam} fill sizes="(min-width:961px) 25vw, (min-width:640px) 50vw, 100vw" className="object-contain" />
                    </div>
                    <div className="mt-[22px] flex items-baseline justify-between gap-3 border-b border-line pb-[14px]">
                      <h3 className="text-[clamp(22px,2.2vw,26px)] font-semibold tracking-[-.03em]">{cat.naam}</h3>
                      <span className="text-[13px] font-semibold text-accent">{a.nr}</span>
                    </div>
                    <p className="mt-4 text-base leading-[1.6] text-text-3">{a.tekst}</p>
                    <span className="mt-5 inline-flex items-center gap-[9px] text-[15px] font-semibold text-accent">Bekijk {cat.naam.toLowerCase()}<Arrow size={13} /></span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Voor & na */}
      <section className="bg-ink text-white">
        <div className="wrap py-[clamp(72px,8vw,110px)]">
          <div className="flex flex-wrap items-end justify-between gap-[22px]">
            <div>
              <p className="eyebrow-dark">Voor &amp; na</p>
              <h2 className="mt-[22px] text-[clamp(28px,4vw,50px)] font-semibold leading-[1.04] tracking-[-.04em]">Sleep de lijn en zie het verschil.</h2>
            </div>
            <p className="max-w-[320px] text-[15.5px] leading-[1.6] text-white/[.62]">Vrijstaande woning, [plaats]. Kunststof kozijnen in antraciet met HR++ glas, in twee dagen geplaatst.</p>
          </div>
          <BeforeAfter />
        </div>
      </section>

      {/* 6. Zo werkt het */}
      <section id="werkwijze" className="wrap scroll-mt-24 py-[clamp(72px,9vw,120px)]">
        <div className="flex flex-wrap items-end justify-between gap-[22px]">
          <div>
            <p className="eyebrow">Zo werkt het</p>
            <h2 className="h2-xl mt-[22px]">Van eerste gesprek tot oplevering.</h2>
          </div>
          <p className="max-w-[330px] text-[16.5px] leading-[1.6] text-text-4b">Zes stappen, één aanspreekpunt. U weet steeds wie er komt en wanneer.</p>
        </div>
        <ol className="m-0 mt-[52px] grid list-none grid-cols-1 border-t border-line p-0 nav:grid-cols-3">
          {STAPPEN.map(([t, s], i) => (
            <Reveal as="li" key={t} className={`border-b border-line py-9 pb-10 ${i % 3 === 0 ? 'nav:pr-8' : i % 3 === 1 ? 'nav:border-r nav:px-8' : 'nav:pl-8'} ${i % 3 === 0 ? 'nav:border-r' : ''}`}>
              <p className="text-xs font-semibold tracking-[.12em] text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-[22px] font-semibold tracking-[-.03em]">{t}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.6] text-text-4">{s}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* 7. Reviews */}
      <section id="reviews" className="scroll-mt-24 border-t border-line-2 bg-paper-2">
        <div className="wrap py-[clamp(72px,8vw,110px)]">
          <div className="grid items-start gap-[clamp(36px,5vw,80px)] nav:grid-cols-[1fr_1.35fr]">
            <div>
              <p className="eyebrow">Wat klanten zeggen</p>
              <h2 className="mt-[22px] text-[clamp(28px,3.6vw,46px)] font-semibold leading-[1.04] tracking-[-.04em]">Beoordeeld op het werk, niet op de praatjes.</h2>
              <p className="mt-6 text-xs leading-[1.6] text-text-5">Onderstaande reviews zijn voorbeelden. Vervang ze door uw echte Google-reviews.</p>
            </div>
            <div>
              {REVIEWS.map((q, i) => (
                <Reveal as="blockquote" key={q} className={`border-t border-[#DCD6CB] py-[30px] ${i === REVIEWS.length - 1 ? 'border-b' : ''}`}>
                  <p aria-label="5 van 5 sterren" className="text-sm tracking-[.18em] text-accent">★★★★★</p>
                  <p className={i === 0 ? 'mt-[18px] text-[clamp(19px,2.2vw,26px)] font-medium leading-[1.4] tracking-[-.025em]' : 'mt-4 text-[17.5px] leading-[1.55] text-text-2'}>“{q}”</p>
                  <footer className="mt-4 text-[14.5px] text-text-4b">— [Naam klant], [Plaats]</footer>
                </Reveal>
              ))}
              <div className="mt-7 flex flex-wrap gap-3">
                {['Google Reviews', '[Keurmerk]', '[Certificering]', '[Garantieregeling]'].map((b) => (
                  <span key={b} className="border border-[#DCD6CB] px-[18px] py-[14px] text-[13px] font-semibold text-text-4b">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Verwachtingen */}
      <section className="wrap py-[clamp(72px,9vw,120px)]">
        <p className="eyebrow">Wat u van ons kunt verwachten</p>
        <div className="mt-8 grid grid-cols-1 border-t border-line sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {VERWACHTING.map(([t, s], i) => (
            <div key={t} className={`py-[30px] pb-[34px] ${i > 0 ? 'sm:pl-[22px]' : ''} ${i < VERWACHTING.length - 1 ? 'sm:border-r sm:border-line sm:pr-[22px]' : ''}`}>
              <h3 className="text-[17px] font-semibold leading-[1.3] tracking-[-.02em]">{t}</h3>
              <p className="mt-[10px] text-[14.5px] leading-[1.55] text-text-4b">{s}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
