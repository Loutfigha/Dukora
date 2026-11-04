import { SITE } from '@/lib/site';
import TLink from './TLink';

/** Donkere band voor onderaan overzichtspagina's: hulp bij kiezen, met twee duidelijke vervolgstappen. */
export default function HulpBand({ titel = 'Weet u niet welk systeem bij uw woning past?', tekst = 'Dat is normaal. Wij komen langs, meten in en adviseren eerlijk wat bij uw gevel en uw wensen past. Zonder verplichtingen.' }: { titel?: string; tekst?: string }) {
  return (
    <section className="border-t border-lijn bg-white">
      <div className="wrap grid items-center gap-10 py-[clamp(56px,7vw,104px)] nav:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="t-section max-w-[18ch] !text-[clamp(30px,3.6vw,52px)]">{titel}</h2>
          <p className="mt-5 max-w-[52ch] text-[17.5px] leading-[1.6] text-steen">{tekst}</p>
        </div>
        <div className="flex flex-wrap gap-3 nav:justify-end">
          <TLink href="/offerte-aanvragen" track="cta_offerte_band" className="btn-primary px-8 py-[18px]">Vraag een offerte aan</TLink>
          <TLink href={SITE.whatsapp} track="whatsapp_hero" className="btn-ghost px-7 py-[18px]">WhatsApp ons</TLink>
        </div>
      </div>
    </section>
  );
}
