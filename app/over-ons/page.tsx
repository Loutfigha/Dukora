import type { Metadata } from 'next';
import Image from 'next/image';
import Frame from '@/components/Frame';
import Voordelen from '@/components/Voordelen';
import HulpBand from '@/components/HulpBand';

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

export default function OverOns() {
  return (
    <main>
      <section>
        <div className="wrap pb-[clamp(56px,7vw,112px)] pt-[clamp(56px,8vw,128px)]">
          <p className="label opkomst mb-6">Over Dukora</p>
          <h1 className="t-page opkomst max-w-[16ch]">Vijftien jaar kozijnen plaatsen leert je waar het misgaat.</h1>
        </div>
      </section>

      <section className="relative aspect-[16/8] min-h-[260px] w-full bg-nacht">
        <Image src="/img/foto/bedrijfspand.webp" alt="Het Dukora-bedrijfspand met de bus ervoor" fill priority sizes="100vw" className="object-cover object-[50%_40%]" />
      </section>

      <section className="bg-white">
        <div className="wrap grid items-start gap-[clamp(40px,6vw,110px)] py-[clamp(64px,8vw,128px)] nav:grid-cols-[1fr_1.1fr]">
          <p className="display text-[clamp(26px,3vw,44px)] leading-[1.15]">Wij zijn geen tussenhandel. We meten zelf in, we plaatsen zelf en we zijn er zelf als er iets nagekeken moet worden.</p>
          <div className="space-y-6">
            <p className="body-l">Dukora begon vijftien jaar geleden met één bus en twee monteurs. Inmiddels werken we door heel Nederland, met vaste teams die elkaars werk kennen. Wat niet veranderde: bij elk project komt er eerst iemand kijken. Niet om te verkopen, maar om te meten en te bepalen wat er technisch nodig is.</p>
            <p className="body-l">Dat is ook waar het bij veel vervangingen misgaat. Een kozijn is zo goed als de aansluiting op de muur. Wij nemen de tijd voor die aansluiting, werken stofarm en laten de woning netjes achter. Als er na oplevering iets is, staan we er weer.</p>
            <p className="body-l">Productie, planning en montage houden we in eigen beheer. Daardoor kunnen we een levertijd afgeven die klopt, en hoeft u niet te wachten tot drie partijen op elkaar wachten.</p>
          </div>
        </div>
      </section>

      <Voordelen border={false} />

      <section>
        <div className="wrap grid items-center gap-[clamp(40px,6vw,110px)] py-[clamp(64px,8vw,128px)] nav:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="t-section max-w-[12ch]">Waar we op worden afgerekend.</h2>
            <dl className="mt-10 space-y-7">
              {WAARDEN.map(([t, s]) => (
                <div key={t} className="border-t border-lijn pt-6">
                  <dt className="t-sub">{t}</dt>
                  <dd className="m-0 mt-2 text-[16.5px] leading-[1.6] text-steen">{s}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Frame src="/img/foto/monteur-portret.webp" alt="Dukora-monteur met gekruiste armen voor een grote schuifpui" aspect="aspect-[3/2]" sizes="(min-width:961px) 45vw, 90vw" />
        </div>
      </section>
      <HulpBand titel="Benieuwd hoe wij werken?" tekst="Plan een vrijblijvend gesprek. We komen langs, meten in en vertellen eerlijk wat er mogelijk is." />
    </main>
  );
}
