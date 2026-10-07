import { SITE } from '@/lib/site';
import TLink from './TLink';

/** Desktop: zwevende knop. Mobiel: vaste bottom bar (WhatsApp | Bellen | Offerte). */
export default function WhatsAppFloat() {
  return (
    <>
      <TLink
        href={SITE.whatsapp}
        track="whatsapp_float"
        aria-label="WhatsApp ons"
        className="fixed bottom-[26px] right-[26px] z-[70] hidden items-center gap-[11px] bg-ink px-5 py-[15px] text-[15px] font-semibold text-white shadow-[0_10px_34px_rgba(0,0,0,.24)] hover:bg-accent hover:text-white nav:flex"
      >
        <span className="h-[9px] w-[9px] rounded-full bg-wa-dot shadow-[0_0_0_4px_rgba(79,209,96,.22)]" />
        WhatsApp ons
      </TLink>
      <div className="fixed inset-x-0 bottom-0 z-[70] flex border-t border-white/[.14] bg-ink-deep nav:hidden">
        <TLink href={SITE.whatsapp} track="whatsapp_bar" className="flex-1 border-r border-white/[.14] px-2 py-[19px] text-center text-sm font-semibold text-white hover:text-white">WhatsApp</TLink>
        <TLink href={SITE.phoneHref} track="tel_bar" className="flex-1 border-r border-white/[.14] px-2 py-[19px] text-center text-sm font-semibold text-white hover:text-white">Bellen</TLink>
        <TLink href="/offerte-aanvragen" track="cta_offerte_bar" className="flex-[1.2] bg-accent px-2 py-[19px] text-center text-sm font-semibold text-white hover:text-white">Offerte</TLink>
      </div>
    </>
  );
}
