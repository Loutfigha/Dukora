'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/site';
import TLink from './TLink';
import Logo from './Logo';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-[60] border-b border-lijn bg-glas/90 backdrop-blur-[18px]">
      <div className="wrap flex h-[84px] items-center justify-between gap-8">
        <Link href="/" aria-label="Dukora, naar de homepage" className="flex-none text-dennen hover:text-dennen"><Logo size={32} /></Link>
        <nav aria-label="Hoofdmenu" className="mx-auto hidden items-center gap-1 nav:flex">
          {NAV.map((n) => {
            const actief = pathname === n.href || pathname.startsWith(n.href + '/');
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={actief ? 'page' : undefined}
                className={`relative whitespace-nowrap px-3 py-2 text-[15px] font-medium transition-colors [@media(min-width:1180px)]:px-4 ${actief ? 'text-ink' : 'text-steen hover:text-ink'}`}
              >
                {n.label}
                {actief && <span className="absolute inset-x-3 -bottom-[1px] h-[2px] bg-dennen [@media(min-width:1180px)]:inset-x-4" />}
              </Link>
            );
          })}
        </nav>
        <div className="hidden flex-none items-center gap-6 nav:flex">
          <TLink href="/offerte-aanvragen" track="cta_offerte_nav" className="btn-primary whitespace-nowrap px-6 py-[13px]">Offerte aanvragen</TLink>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobiel-menu"
          className="border border-line-3 px-4 py-[11px] text-[15px] font-medium nav:hidden"
        >
          {open ? 'Sluiten' : 'Menu'}
        </button>
      </div>
      {open && (
        <div id="mobiel-menu" className="border-t border-lijn bg-glas px-5 pb-6 pt-3 nav:hidden">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="block border-b border-lijn py-4 font-display text-[26px] font-light tracking-[-.02em] text-ink hover:text-ink">{n.long}</Link>
          ))}
          <TLink href="/offerte-aanvragen" track="cta_offerte_nav" className="btn-primary mt-6 w-full py-[17px]">Offerte aanvragen</TLink>
        </div>
      )}
    </header>
  );
}
