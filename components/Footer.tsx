import Link from 'next/link';
import { LIVE, SITE } from '@/lib/site';
import TLink from './TLink';
import Logo from './Logo';

const linkCls = 'text-[15.5px] text-white/70 hover:text-white';
const headCls = 'mb-5 text-[14px] font-semibold text-salie';

export default function Footer() {
  const bedrijf = [LIVE.kvk && `KvK ${LIVE.kvk}`, LIVE.btw && `BTW ${LIVE.btw}`].filter(Boolean).join(' · ');
  return (
    <footer className="bg-ink-deep text-white/70">
      <div className="wrap pb-10 pt-[clamp(64px,7vw,104px)]">
        <div className="grid gap-[clamp(36px,4vw,64px)] nav:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Dukora, naar de homepage" className="text-salie hover:text-salie"><Logo variant="gestapeld" size={104} woordKleur="#FFFFFF" /></Link>
            <p className="mt-6 max-w-[320px] text-[16px] leading-[1.65]">PVC ramen, deuren, schuifsystemen en horren. Ingemeten, geleverd en geplaatst door onze eigen mensen, in heel Nederland.</p>
            <TLink href={SITE.phoneHref} track="tel_footer" className="mt-6 block font-display text-[28px] font-light tracking-[-.02em] text-white hover:text-salie">{SITE.phone}</TLink>
          </div>
          <div>
            <h3 className={headCls}>Assortiment</h3>
            <div className="flex flex-col gap-3">
              <Link className={linkCls} href="/pvc-ramen">PVC ramen</Link>
              <Link className={linkCls} href="/pvc-deuren">PVC deuren</Link>
              <Link className={linkCls} href="/pvc-schuifsystemen">PVC schuifsystemen</Link>
              <Link className={linkCls} href="/horren">Horren</Link>
            </div>
          </div>
          <div>
            <h3 className={headCls}>Populair</h3>
            <div className="flex flex-col gap-3">
              <Link className={linkCls} href="/pvc-ramen/ideal-7000-nl">Ideal 7000 NL</Link>
              <Link className={linkCls} href="/pvc-deuren/model-pvc-deuren">Model PVC deuren</Link>
              <Link className={linkCls} href="/pvc-schuifsystemen/synego-slide">Synego Slide</Link>
              <Link className={linkCls} href="/horren/jolly">Jolly schuifhor</Link>
            </div>
          </div>
          <div>
            <h3 className={headCls}>Dukora</h3>
            <div className="flex flex-col gap-3">
              <Link className={linkCls} href="/over-ons">Over ons</Link>
              <Link className={linkCls} href="/#werkwijze">Werkwijze</Link>
              <Link className={linkCls} href="/offerte-aanvragen">Offerte aanvragen</Link>
              <Link className={linkCls} href="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className={headCls}>Contact</h3>
            <div className="flex flex-col gap-3">
              <TLink className={linkCls} href={SITE.phoneHref}>Bel ons</TLink>
              <TLink className={linkCls} href={SITE.whatsapp} track="whatsapp_footer">WhatsApp</TLink>
              <TLink className={linkCls} href={`mailto:${SITE.email}`}>{SITE.email}</TLink>
              <p className="text-[15.5px] text-white/50">Werkgebied: heel Nederland</p>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-white/[.12] pt-7">
          <p className="text-[14px] text-white/45">© 2026 Dukora{bedrijf && ` · ${bedrijf}`}</p>
          <p className="text-[14px] text-white/45">Algemene voorwaarden · Privacyverklaring</p>
        </div>
      </div>
    </footer>
  );
}
