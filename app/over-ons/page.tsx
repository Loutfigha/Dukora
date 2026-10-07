import type { Metadata } from 'next';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Over ons — vijftien jaar kozijnen plaatsen',
  description: 'Dukora meet zelf in, plaatst zelf en houdt productie, planning en montage in eigen beheer. Lees hoe wij werken en waar we op worden afgerekend.',
  alternates: { canonical: '/over-ons' },
};

const WAARDEN = [
  ['Vakmanschap', 'Vaste teams, eigen mensen, geen wisselende gezichten.'],
  ['Transparantie', 'Eén offerte, alles erin. Geen verrassingen achteraf.'],
  ['Persoonlijk contact', 'Eén aanspreekpunt van eerste bezoek tot oplevering.'],
  ['Nazorg', 'Garantie op papier en een monteur die terugkomt.'],
];

const FOTOS = [
  ['Onze monteurs, [locatie]', 'Monteur aan het werk, staand'],
  ['Werkplaats, [locatie]', 'Werkplaats of productie, staand'],
  ['Showroom, [locatie]', 'Showroom of adviesgesprek, staand'],
];

export default function OverOns() {
  return (
    <main>
      <section className="wrap pb-[clamp(36px,4vw,56px)] pt-[clamp(48px,6vw,84px)]">
        <p className="eyebrow">Over Dukora</p>
        <h1 className="mt-[22px] max-w-[900px] text-[clamp(34px,5.2vw,70px)] font-semibold leading-[1.02] tracking-[-.045em]">Vijftien jaar kozijnen plaatsen leert je waar het misgaat.</h1>
      </section>
      <section className="h-[min(60vh,560px)] w-full bg-[#1A1D21]">
        <Photo priority placeholder="Team of monteurs aan het werk, liggend" className="!bg-[#1A1D21]" />
      </section>
      <section className="wrap py-[clamp(56px,7vw,96px)]">
        <div className="grid items-start gap-[clamp(32px,5vw,80px)] nav:grid-cols-[1fr_1.2fr]">
          <p className="text-[clamp(20px,2.4vw,27px)] font-medium leading-[1.4] tracking-[-.025em]">Wij zijn geen tussenhandel. We meten zelf in, we plaatsen zelf, en we zijn er zelf als er iets nagekeken moet worden.</p>
          <div className="space-y-5 text-[17px] leading-[1.65] text-text-3">
            <p>Dukora begon vijftien jaar geleden met één bus en twee monteurs. Inmiddels werken we door heel Nederland, met vaste teams die elkaars werk kennen. Wat niet veranderde: bij elk project komt er eerst iemand kijken. Niet om te verkopen, maar om te meten en te bepalen wat er technisch nodig is.</p>
            <p>Dat is ook waar het bij veel vervangingen misgaat. Een kozijn is zo goed als de aansluiting op de muur. Wij nemen de tijd voor die aansluiting, werken stofarm en laten de woning netjes achter. Als er na oplevering iets is, staan we er weer.</p>
            <p>Productie, planning en montage houden we in eigen beheer. Daardoor kunnen we een levertijd afgeven die klopt, en hoeft u niet te wachten tot drie partijen op elkaar wachten.</p>
          </div>
        </div>
        <div className="mt-[clamp(48px,6vw,80px)] grid gap-[clamp(20px,3vw,32px)] nav:grid-cols-3">
          {FOTOS.map(([cap, ph]) => (
            <Reveal key={cap}>
              <Photo aspect="aspect-[3/4]" placeholder={ph} sizes="(min-width:961px) 33vw, 100vw" />
              <p className="mt-[14px] text-sm text-text-4b">{cap}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-ink text-white">
        <div className="wrap py-[clamp(56px,6vw,88px)]">
          <h2 className="max-w-[620px] text-[clamp(24px,3vw,36px)] font-semibold leading-[1.08] tracking-[-.035em]">Waar we op worden afgerekend.</h2>
          <div className="mt-10 grid border-t border-white/[.16] sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {WAARDEN.map(([t, s], i) => (
              <div key={t} className={`py-7 pb-8 ${i > 0 ? 'sm:pl-[26px]' : ''} ${i < WAARDEN.length - 1 ? 'sm:border-r sm:border-white/[.13] sm:pr-[26px]' : ''}`}>
                <h3 className="text-[17px] font-semibold tracking-[-.02em]">{t}</h3>
                <p className="mt-[10px] text-[14.5px] leading-[1.55] text-white/[.62]">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
