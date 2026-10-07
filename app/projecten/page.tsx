import type { Metadata } from 'next';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Projecten — woningen met nieuwe kozijnen',
  description: 'Bekijk projecten van Dukora: kunststof, aluminium en houten kozijnen in vrijstaande woningen, jaren-30 huizen, aanbouwen en tussenwoningen.',
  alternates: { canonical: '/projecten' },
};

type Rij = [string, string];
const PROJECT_1: Rij[] = [['Woningtype', 'Vrijstaand, bouwjaar [jaar]'], ['Materiaal', 'Kunststof, 6-kamer'], ['Kleur', 'Antraciet buiten, wit binnen'], ['Glas', 'HR++'], ['Resultaat', 'Label [X] → label [X]']];
const PROJECT_2: Rij[] = [['Woningtype', 'Twee-onder-een-kap, 1932'], ['Materiaal', 'Hout (accoya)'], ['Kleur', 'RAL 9010 met [kleur] draaiend werk'], ['Glas', 'Monumentenglas'], ['Resultaat', 'Origineel beeld, moderne isolatie']];

function Specs({ rows }: { rows: Rij[] }) {
  return (
    <dl className="m-0 mt-[26px] border-t border-line">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-4 border-b border-line py-[13px]">
          <dt className="text-sm text-text-5">{k}</dt>
          <dd className="m-0 text-right text-[15px] font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const h2 = 'mt-[14px] text-[clamp(24px,2.8vw,34px)] font-semibold leading-[1.08] tracking-[-.035em]';
const nr = 'text-xs font-semibold tracking-[.14em] text-accent';

export default function Projecten() {
  return (
    <main>
      <section className="wrap pb-[clamp(40px,4vw,60px)] pt-[clamp(48px,6vw,84px)]">
        <p className="eyebrow">Projecten</p>
        <div className="mt-[22px] grid items-end gap-[clamp(28px,4vw,64px)] nav:grid-cols-[1.3fr_1fr]">
          <h1 className="text-[clamp(36px,5.6vw,74px)] font-semibold leading-none tracking-[-.045em]">Woningen die we onder handen namen.</h1>
          <p className="body-l">Van een tussenwoning met vier ramen tot een vrijstaand huis met een schuifpui van zes meter. Per project ziet u het materiaal, de kleur, het glas en wat het opleverde.</p>
        </div>
      </section>

      <section className="border-t border-line-2">
        <div className="wrap pb-[clamp(72px,8vw,110px)]">
          <Reveal as="article" className="border-b border-line py-[clamp(40px,5vw,64px)]">
            <div className="grid items-start gap-[clamp(28px,4vw,52px)] nav:grid-cols-[1.5fr_1fr]">
              <Photo aspect="aspect-[16/10]" placeholder="Project 1 — vrijstaande woning na plaatsing" sizes="(min-width:961px) 60vw, 100vw" />
              <div>
                <p className={nr}>01</p>
                <h2 className={h2}>Vrijstaande woning — [Plaats]</h2>
                <p className="body-l mt-4 !leading-[1.6]">Nieuwe kunststof kozijnen en openslaande deuren aan de tuinzijde. De woonkamer kreeg twee ramen extra glas doordat de tussenstijlen eruit konden.</p>
                <Specs rows={PROJECT_1} />
              </div>
            </div>
          </Reveal>

          <Reveal as="article" className="border-b border-line py-[clamp(40px,5vw,64px)]">
            <div className="grid items-start gap-[clamp(28px,4vw,52px)] nav:grid-cols-[1fr_1.5fr]">
              <div className="order-2 nav:order-1">
                <p className={nr}>02</p>
                <h2 className={h2}>Jaren-30 woning — [Plaats]</h2>
                <p className="body-l mt-4 !leading-[1.6]">Houten kozijnen met de oorspronkelijke roedeverdeling, opnieuw gemaakt in accoya. Van buiten hetzelfde beeld, van binnen een heel ander huis.</p>
                <Specs rows={PROJECT_2} />
              </div>
              <div className="order-1 nav:order-2">
                <Photo aspect="aspect-[16/10]" placeholder="Project 2 — jaren-30 woning, gevelbeeld" sizes="(min-width:961px) 60vw, 100vw" />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-[clamp(24px,3vw,44px)] pt-[clamp(40px,5vw,64px)] nav:grid-cols-2">
            <Reveal as="article">
              <Photo aspect="aspect-[4/3]" placeholder="Project 3 — aluminium schuifpui" sizes="(min-width:961px) 50vw, 100vw" />
              <p className={`${nr} mt-5`}>03</p>
              <h2 className="mt-[10px] text-2xl font-semibold tracking-[-.03em]">Aanbouw met schuifpui — [Plaats]</h2>
              <p className="mt-3 text-[15.5px] leading-[1.6] text-text-4">Aluminium schuifpui van [X] meter in RAL 7016. Twee dagen werk, tuin en keuken lopen nu in elkaar over.</p>
            </Reveal>
            <Reveal as="article">
              <Photo aspect="aspect-[4/3]" placeholder="Project 4 — tussenwoning voorzijde" sizes="(min-width:961px) 50vw, 100vw" />
              <p className={`${nr} mt-5`}>04</p>
              <h2 className="mt-[10px] text-2xl font-semibold tracking-[-.03em]">Tussenwoning — [Plaats]</h2>
              <p className="mt-3 text-[15.5px] leading-[1.6] text-text-4">Zes kozijnen en een voordeur in één dag vervangen. Bewoners konden dezelfde avond weer normaal wonen.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
