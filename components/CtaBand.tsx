import { SITE } from '@/lib/site';
import TLink from './TLink';
import Arrow from './Arrow';

export default function CtaBand() {
  return (
    <section className="bg-accent text-white">
      <div className="wrap flex flex-wrap items-end justify-between gap-8 py-[clamp(64px,7vw,96px)]">
        <div>
          <h2 className="max-w-[620px] text-[clamp(28px,4vw,52px)] font-semibold leading-[1.02] tracking-[-.04em]">Benieuwd wat nieuwe kozijnen voor uw woning kosten?</h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.55] text-white/85">Zeven korte vragen. U hoort binnen twee werkdagen wat er mogelijk is — vrijblijvend en zonder verplichtingen.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <TLink href="/offerte-aanvragen" track="cta_offerte_band" className="btn bg-ink px-7 py-[19px] text-base text-white hover:bg-black hover:text-white">
            Vraag een vrijblijvende offerte aan<Arrow />
          </TLink>
          <TLink href={SITE.phoneHref} track="tel_band" className="btn border border-white/50 px-[26px] py-[19px] text-base text-white hover:bg-white/[.12] hover:text-white">
            Bel {SITE.phone}
          </TLink>
        </div>
      </div>
    </section>
  );
}
