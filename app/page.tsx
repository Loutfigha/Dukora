import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { CATEGORIES, DEUREN, productBySlug } from '@/lib/catalogus';
import TLink from '@/components/TLink';
import Frame from '@/components/Frame';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: 'Dukora — PVC ramen, deuren, schuifsystemen en horren | Heel Nederland' },
  description: SITE.description,
  alternates: { canonical: '/' },
};

const ideal = productBySlug('pvc-ramen', 'ideal-7000-nl')!;

const ASSORTIMENT = [
  { cat: 'pvc-ramen' as const, img: ideal.image, tekst: 'Warme, stille ramen die jaren zonder schilderwerk meegaan. De Ideal 7000 NL is KOMO-gecertificeerd en ontwikkeld voor de Nederlandse markt.' },
  { cat: 'pvc-deuren' as const, img: DEUREN.find((d) => d.slug === 'model-pvc-deuren')!.image, tekst: 'Buitendeuren in zes collecties en honderden modellen, passend bij uw ramen en bij uw gevel.' },
  { cat: 'pvc-schuifsystemen' as const, img: productBySlug('pvc-schuifsystemen', 'synego-slide')!.image, tekst: 'Vijftien systemen voor schuifpuien en hefschuifdeuren: veel daglicht, een soepele bediening en goede isolatie.' },
  { cat: 'horren' as const, img: productBySlug('horren', 'jolly')!.image, tekst: 'Vaste en uitschuifbare horren en deurklamboes, zodat de ramen open kunnen en insecten buiten blijven.' },
];

const BELOFTEN = [
  ['Eigen montageteams', 'Geen onderaannemers die u nooit eerder zag. Dezelfde mensen meten in, plaatsen en leveren op.'],
  ['Advies, geen verkoop', 'Een specialist die bij u thuis meet en meedenkt, en pas daarna een prijs noemt.'],
  ['Eén partij, van productie tot montage', 'Daardoor kunnen we een planning afgeven die klopt, en die we nakomen.'],
];

const VERSCHIL = [
  ['Betere isolatie', 'Kierdicht geplaatst, met HR++ of triple glas.'],
  ['Lagere energiekosten', 'Minder warmteverlies, dus lagere stookkosten.'],
  ['Meer comfort', 'Geen koudeval bij het raam en merkbaar minder straatgeluid.'],
  ['Minder onderhoud', 'Schoonmaken is genoeg. Geen schilderwerk.'],
  ['Een rustiger gevel', 'Slankere profielen en meer glas.'],
  ['Meer waarde', 'Een beter energielabel telt mee bij verkoop.'],
];

const STAPPEN = [
  ['Advies', 'We bespreken uw woning, wensen en mogelijkheden. Zonder verkoper aan de deur.'],
  ['Inmeten', 'Onze specialist komt bij u langs en meet elk kozijn zelf op.'],
  ['Offerte', 'U ontvangt een transparante offerte: materiaal, glas, montage en afwerking.'],
  ['Productie', 'Uw kozijnen worden op maat gemaakt. U hoort wanneer ze klaarstaan.'],
  ['Montage', 'Onze eigen monteurs plaatsen de kozijnen en werken alles netjes af.'],
  ['Oplevering', 'We lopen alles samen na, ruimen op en laten de garantie op papier achter.'],
];

export default function Home() {
  return (
    <main>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: 'Dukora', url: SITE.url, telephone: SITE.phone, email: SITE.email, areaServed: 'NL', description: SITE.description }} />

      {/* Hero: kopregel links, een gekaderde foto rechts. De enige beweging op de pagina. */}
      <section>
        <div className="wrap grid items-center gap-[clamp(40px,6vw,100px)] pb-[clamp(64px,8vw,128px)] pt-[clamp(40px,6vw,96px)] nav:grid-cols-[1.15fr_1fr]">
          <div>
            <h1 className="t-hero opkomst" style={{ ['--i' as string]: 0 }}>Nieuwe kozijnen.<br />Een beter huis.</h1>
            <p className="lede opkomst mt-8 max-w-[34ch]" style={{ ['--i' as string]: 2 }}>PVC ramen, deuren, schuifsystemen en horren, ingemeten, gemaakt en geplaatst door onze eigen mensen. Beter geïsoleerd, stiller in huis en jaren zonder onderhoud.</p>
            <div className="opkomst mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ ['--i' as string]: 3 }}>
              <TLink href="/offerte-aanvragen" track="cta_offerte_hero" className="btn-primary px-8 py-[19px] text-[16.5px]">Vraag een offerte aan</TLink>
              <TLink href={SITE.whatsapp} track="whatsapp_hero" className="link-cta">Stel uw vraag via WhatsApp</TLink>
            </div>
          </div>
          <div className="opkomst" style={{ ['--i' as string]: 1 }}>
            <Frame src="/img/foto/gevel-woning.webp" alt="Gevel van een woning met witte kozijnen op de begane grond en de verdieping" priority sizes="(min-width:961px) 38vw, 90vw" className="mx-auto max-w-[560px] nav:mr-0">
              <Link href="/pvc-ramen/ideal-7000-nl" className="group absolute -bottom-6 left-4 max-w-[270px] border border-ink/[.14] bg-white p-5 text-ink hover:text-ink sm:-left-8">
                <span className="block text-[13.5px] text-steen">Uitgelicht profiel</span>
                <span className="t-sub mt-1 block group-hover:text-dennen">Ideal 7000 NL</span>
                <span className="mt-2 block text-[14.5px] leading-[1.45] text-steen">KOMO-gecertificeerd, inbraakwerend volgens RC2</span>
              </Link>
            </Frame>
          </div>
        </div>
      </section>

      {/* Assortiment */}
      <section className="bg-white">
        <div className="wrap py-[clamp(72px,9vw,150px)]">
          <div className="grid items-end gap-8 nav:grid-cols-[1.3fr_1fr]">
            <h2 className="t-section max-w-[17ch]">Vier productgroepen, één aanspreekpunt.</h2>
            <p className="body-l">Welk systeem past bij uw woning hangt af van de gevel, de sponning die er nu zit en wat u wilt vervangen. Daar kijken we bij u thuis naar.</p>
          </div>
          <div className="mt-[clamp(48px,6vw,96px)] grid gap-x-[clamp(24px,4vw,64px)] gap-y-[clamp(48px,6vw,88px)] sm:grid-cols-2">
            {ASSORTIMENT.map((a) => {
              const cat = CATEGORIES[a.cat];
              return (
                <Link key={a.cat} href={cat.path} className="group block text-ink hover:text-ink">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-glas">
                    <Image src={a.img.src} alt={cat.naam} fill sizes="(min-width:640px) 45vw, 100vw" className="object-contain p-6" />
                  </div>
                  <h3 className="t-sub mt-7 !text-[clamp(28px,3vw,40px)] group-hover:text-dennen">{cat.naam}</h3>
                  <p className="body-l mt-3 max-w-[46ch] !text-[16.5px]">{a.tekst}</p>
                  <span className="mt-5 inline-block text-[15.5px] font-medium text-dennen underline decoration-dennen/30 underline-offset-[6px] group-hover:decoration-dennen">Bekijk {cat.naam.toLowerCase()}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Belofte */}
      <section className="bg-dennen text-white">
        <div className="wrap py-[clamp(72px,9vw,150px)]">
          <p className="display max-w-[24ch] text-[clamp(30px,4vw,62px)] leading-[1.08] text-white">Wij zijn geen tussenhandel. We meten zelf in, we plaatsen zelf en we zijn er zelf als er iets nagekeken moet worden.</p>
          <div className="mt-[clamp(48px,6vw,96px)] grid gap-x-12 gap-y-10 border-t border-white/20 pt-10 nav:grid-cols-3">
            {BELOFTEN.map(([t, s]) => (
              <div key={t}>
                <h3 className="t-sub text-white">{t}</h3>
                <p className="mt-3 max-w-[34ch] text-[16.5px] leading-[1.6] text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Het verschil */}
      <section>
        <div className="wrap grid items-center gap-[clamp(40px,6vw,110px)] py-[clamp(72px,9vw,150px)] nav:grid-cols-[1fr_1.1fr]">
          <Frame src="/img/foto/ramen-interieur.webp" alt="Ramen met donkere kozijnen van binnenuit gezien, met daglicht en gordijnen" aspect="aspect-[3/2]" sizes="(min-width:961px) 45vw, 90vw" />
          <div>
            <h2 className="t-section max-w-[13ch]">Het verschil merkt u de eerste winter.</h2>
            <p className="body-l mt-6">Oude kozijnen laten warmte, geluid en vocht door. Met goede profielen en HR++ of triple glas blijft de warmte binnen, zakt uw energierekening en is het merkbaar stiller in huis.</p>
            <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {VERSCHIL.map(([t, s]) => (
                <div key={t}>
                  <dt className="text-[17px] font-semibold">{t}</dt>
                  <dd className="m-0 mt-1 text-[15.5px] leading-[1.55] text-steen">{s}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Werkwijze: dit is echt een reeks, dus hier horen de nummers wel */}
      <section id="werkwijze" className="scroll-mt-28 bg-white">
        <div className="wrap grid gap-[clamp(40px,6vw,110px)] py-[clamp(72px,9vw,150px)] nav:grid-cols-[1fr_1.6fr]">
          <div className="nav:sticky nav:top-[130px] nav:self-start">
            <h2 className="t-section max-w-[10ch]">Van eerste gesprek tot oplevering.</h2>
            <p className="body-l mt-6">Zes stappen, één aanspreekpunt. U weet steeds wie er komt en wanneer.</p>
          </div>
          <ol className="m-0 list-none p-0">
            {STAPPEN.map(([t, s], i) => (
              <li key={t} className="grid grid-cols-[64px_1fr] gap-5 border-t border-lijn py-8 first:border-t-0 first:pt-0 sm:grid-cols-[96px_1fr]">
                <span className="display text-[clamp(40px,4.4vw,64px)] leading-none text-dennen/70">{i + 1}</span>
                <div>
                  <h3 className="t-sub">{t}</h3>
                  <p className="body-l mt-2 !text-[16.5px]">{s}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Uitgelicht profiel: echte cijfers, daarom wel groot */}
      <section>
        <div className="wrap grid items-center gap-[clamp(40px,6vw,110px)] py-[clamp(72px,9vw,150px)] nav:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[4/3] bg-white">
            <Image src={ideal.image.src} alt="Doorsnede van het Ideal 7000 NL profiel met het KOMO-keurmerk" fill sizes="(min-width:961px) 50vw, 100vw" className="object-contain p-4" />
          </div>
          <div>
            <h2 className="t-section max-w-[12ch]">Ideal 7000 NL</h2>
            <p className="body-l mt-6">Een kunststof raamprofiel dat speciaal voor de Nederlandse markt is ontwikkeld. Te lassen onder 45 of 90 graden, zodat het ook van dichtbij op hout lijkt.</p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-9">
              {[['0,76', 'Uw-waarde in W/m²K'], ['120 mm', 'inbouwdiepte'], ['RC2', 'inbraakwerend'], ['KOMO', 'gecertificeerd']].map(([n, l]) => (
                <div key={l}>
                  <dt className="display text-[clamp(40px,4.4vw,64px)] leading-none">{n}</dt>
                  <dd className="m-0 mt-2 text-[15px] text-steen">{l}</dd>
                </div>
              ))}
            </dl>
            <TLink href="/pvc-ramen/ideal-7000-nl" className="link-cta mt-10">Bekijk de Ideal 7000 NL</TLink>
          </div>
        </div>
      </section>
    </main>
  );
}
