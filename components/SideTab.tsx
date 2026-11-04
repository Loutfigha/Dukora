import Link from 'next/link';

/** Vaste tab aan de rechterrand (desktop). Springt naar het adviesformulier op de homepage. */
export default function SideTab() {
  return (
    <Link
      href="/#adviesgesprek"
      className="fixed right-0 top-1/2 z-[65] hidden -translate-y-1/2 bg-dennen px-[14px] py-6 text-[15px] font-medium text-white [writing-mode:vertical-rl] hover:bg-dennen-diep hover:text-white nav:block"
      style={{ transform: 'translateY(-50%) rotate(180deg)' }}
    >
      Gratis adviesgesprek
    </Link>
  );
}
