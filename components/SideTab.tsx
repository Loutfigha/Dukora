'use client';
import Link from 'next/link';
import type { MouseEvent } from 'react';

/** Vaste tab aan de rechterrand (desktop). Heeft de pagina zelf een adviesformulier, dan scrolt de tab daarheen; anders gaat hij naar de homepage. */
export default function SideTab() {
  const klik = (e: MouseEvent) => {
    const form = document.getElementById('adviesgesprek');
    if (!form) return;
    e.preventDefault();
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => form.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true }), 500);
  };
  return (
    <Link
      href="/#adviesgesprek"
      onClick={klik}
      className="fixed right-0 top-1/2 z-[65] hidden bg-dennen px-[14px] py-6 text-[15px] font-medium text-white [writing-mode:vertical-rl] hover:bg-dennen-diep hover:text-white nav:block"
      style={{ transform: 'translateY(-50%) rotate(180deg)' }}
    >
      Gratis adviesgesprek
    </Link>
  );
}
