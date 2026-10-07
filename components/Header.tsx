'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV, SITE } from '@/lib/site';
import TLink from './TLink';
import Arrow from './Arrow';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-[60] border-b border-line-2 bg-paper/90 backdrop-blur-[16px]">
      <div className="wrap flex h-[74px] items-center justify-between gap-7">
        <Link href="/" className="flex-none text-[20px] font-bold tracking-[-.04em] text-ink hover:text-ink">Dukora</Link>
        <nav aria-label="Hoofdmenu" className="ml-[14px] mr-auto hidden items-center gap-[2px] nav:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? 'page' : undefined}
              className="px-[13px] py-[9px] text-[14.5px] font-medium text-[#3A3F45] hover:text-ink aria-[current=page]:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden flex-none items-center gap-[18px] nav:flex">
          <TLink href={SITE.phoneHref} track="tel_click" className="text-[14.5px] font-medium tracking-[-.01em] text-ink hover:text-accent">{SITE.phone}</TLink>
          <TLink href="/offerte-aanvragen" track="cta_offerte_nav" className="btn-primary gap-[9px] px-5 py-[13px] text-[14.5px]">
            Offerte aanvragen<Arrow size={13} />
          </TLink>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobiel-menu"
          className="flex items-center gap-[9px] border border-[#D8D3C9] px-[15px] py-[11px] text-sm font-semibold nav:hidden"
        >
          Menu
        </button>
      </div>
      {open && (
        <div id="mobiel-menu" className="border-t border-line-2 bg-paper px-5 pb-[22px] pt-[10px] nav:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="block border-b border-[#E9E5DE] px-[2px] py-[15px] text-[19px] font-semibold tracking-[-.02em] text-ink hover:text-ink">
              {n.long}
            </Link>
          ))}
          <TLink href="/offerte-aanvragen" track="cta_offerte_nav" className="btn-primary mt-[18px] justify-center gap-[9px] px-5 py-[17px] text-base">
            Offerte aanvragen<Arrow />
          </TLink>
        </div>
      )}
    </header>
  );
}
