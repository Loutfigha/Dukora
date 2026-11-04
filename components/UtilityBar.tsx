import Link from 'next/link';
import { SITE } from '@/lib/site';
import TLink from './TLink';
import { IconPin } from './Icons';

/** Smalle balk boven de header: werkgebied links, snelle links rechts. Alleen op desktop. */
export default function UtilityBar() {
  return (
    <div className="hidden border-b border-lijn bg-lijn/35 text-[14px] text-steen nav:block">
      <div className="wrap flex h-10 items-center justify-between">
        <p className="flex items-center gap-2"><IconPin />Wij werken in heel Nederland</p>
        <nav aria-label="Snelle links" className="flex items-center gap-7">
          <Link href="/#werkwijze" className="text-steen hover:text-ink">Werkwijze</Link>
          <Link href="/over-ons" className="text-steen hover:text-ink">Over ons</Link>
          <Link href="/contact" className="text-steen hover:text-ink">Contact</Link>
          <TLink href={SITE.phoneHref} track="tel_click" className="font-medium text-ink hover:text-dennen">{SITE.phone}</TLink>
        </nav>
      </div>
    </div>
  );
}
