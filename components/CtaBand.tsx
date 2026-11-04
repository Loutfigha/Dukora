import { SITE } from '@/lib/site';
import TLink from './TLink';

export default function CtaBand() {
  return (
    <section className="bg-dennen text-white">
      <div className="wrap grid items-end gap-10 py-[clamp(72px,9vw,136px)] nav:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="t-section max-w-[16ch] text-white">Weten wat nieuwe kozijnen voor uw woning kosten?</h2>
          <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.6] text-white/75">Beantwoord zeven korte vragen. U hoort binnen twee werkdagen wat er mogelijk is, vrijblijvend en zonder verplichtingen.</p>
        </div>
        <div className="flex flex-wrap gap-3 nav:justify-end">
          <TLink href="/offerte-aanvragen" track="cta_offerte_band" className="btn-primary-dark px-8 py-[19px] text-[16px]">Vraag een offerte aan</TLink>
          <TLink href={SITE.phoneHref} track="tel_band" className="btn-ghost-dark px-7 py-[19px] text-[16px]">Bel {SITE.phone}</TLink>
        </div>
      </div>
    </section>
  );
}
