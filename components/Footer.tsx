import Link from 'next/link';
import { SITE } from '@/lib/site';
import TLink from './TLink';

const linkCls = 'text-[15px] text-white/[.68] hover:text-white';
const headCls = 'eyebrow-dark mb-[18px]';

export default function Footer() {
  return (
    <footer className="bg-ink-deep text-white/[.68]">
      <div className="wrap pb-10 pt-[clamp(56px,6vw,84px)]">
        <div className="grid gap-[clamp(32px,4vw,56px)] nav:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-[21px] font-bold tracking-[-.04em] text-white hover:text-white">Dukora</Link>
            <p className="mt-5 max-w-[290px] text-[15px] leading-[1.6]">Kozijnen, deuren en schuifpuien. Geleverd en geplaatst door onze eigen mensen, in heel Nederland.</p>
            <TLink href={SITE.phoneHref} track="tel_footer" className="mt-5 block text-[19px] font-semibold text-white hover:text-accent-light">{SITE.phone}</TLink>
          </div>
          <div>
            <h3 className={headCls}>Kozijnen</h3>
            <div className="flex flex-col gap-3">
              <Link className={linkCls} href="/kunststof-kozijnen">Kunststof</Link>
              <Link className={linkCls} href="/aluminium-kozijnen">Aluminium</Link>
              <Link className={linkCls} href="/houten-kozijnen">Hout</Link>
              <Link className={linkCls} href="/kunststof-kozijnen">Deuren</Link>
              <Link className={linkCls} href="/aluminium-kozijnen">Schuifpuien</Link>
            </div>
          </div>
          <div>
            <h3 className={headCls}>Informatie</h3>
            <div className="flex flex-col gap-3">
              <Link className={linkCls} href="/over-ons">Over ons</Link>
              <Link className={linkCls} href="/projecten">Projecten</Link>
              <Link className={linkCls} href="/#werkwijze">Werkwijze</Link>
              <Link className={linkCls} href="/#reviews">Reviews</Link>
              <Link className={linkCls} href="/kunststof-kozijnen#veelgestelde-vragen">Veelgestelde vragen</Link>
            </div>
          </div>
          <div>
            <h3 className={headCls}>Contact</h3>
            <div className="flex flex-col gap-3">
              <TLink className={linkCls} href={SITE.phoneHref}>Telefoon</TLink>
              <TLink className={linkCls} href={SITE.whatsapp} track="whatsapp_footer">WhatsApp</TLink>
              <TLink className={linkCls} href={`mailto:${SITE.email}`}>{SITE.email}</TLink>
              <Link className={linkCls} href="/contact">Werkgebied</Link>
            </div>
          </div>
        </div>
        <div className="mt-[52px] flex flex-wrap justify-between gap-[14px] border-t border-white/[.14] pt-[26px]">
          <p className="text-[13px] text-white/45">© 2026 Dukora · KvK [nummer] · BTW [nummer]</p>
          <p className="text-[13px] text-white/45">Algemene voorwaarden · Privacyverklaring</p>
        </div>
      </div>
    </footer>
  );
}
