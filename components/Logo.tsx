import { useId } from 'react';

/**
 * Dukora-beeldmerk: de verstek-D, gebouwd volgens de brand guide (raster 48 × 48,
 * profielbreedte 9, hoeken van 45°). De vier dunne voegen zijn de verstekverbindingen
 * en zijn echt doorzichtig, zodat het merk op elke achtergrond werkt.
 * Onder 32 px vervallen de voegen (guide: "gebruik dan de massieve versie").
 */
export function DMark({ size = 32, className = '', solid = false }: { size?: number; className?: string; solid?: boolean }) {
  const id = useId().replace(/:/g, '');
  const voegen = size >= 32 && !solid;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false" className={className} fill="currentColor">
      {voegen && (
        <defs>
          <mask id={`d-${id}`} maskUnits="userSpaceOnUse" x="-2" y="-2" width="52" height="52">
            <rect x="-2" y="-2" width="52" height="52" fill="#fff" />
            <path d="M-.5 -.5L9.5 9.5M34.4 -.9L29.6 9.9M34.4 48.9L29.6 38.1M-.7 48.7L9.7 38.3" stroke="#000" strokeWidth=".6" fill="none" />
          </mask>
        </defs>
      )}
      <path fillRule="evenodd" mask={voegen ? `url(#d-${id})` : undefined} d="M0 0H34L48 14V34L34 48H0Z M9 9H30L39 18V30L30 39H9Z" />
    </svg>
  );
}

type Variant = 'primair' | 'gestapeld' | 'beeldmerk';

/**
 * Logo volgens de brand guide. Kleur komt van de tekstkleur van de ouder:
 * Bos op licht (primair), wit op Bos (negatief), Salie op Nacht (gestapeld).
 * Woordmerk: Inter Semibold, kapitalen, spatiëring +160.
 */
export default function Logo({ variant = 'primair', className = '', size = 30 }: { variant?: Variant; className?: string; size?: number }) {
  if (variant === 'beeldmerk') return <DMark size={size} className={className} />;
  const woord = 'font-sans font-semibold uppercase leading-none tracking-[.16em]';
  if (variant === 'gestapeld') {
    return (
      <span className={`inline-flex flex-col items-center gap-4 ${className}`}>
        <DMark size={size * 1.6} />
        <span className={woord} style={{ fontSize: size * 0.66 }}>Dukora</span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center ${className}`} style={{ gap: size * 0.4 }}>
      <DMark size={size} />
      <span className={woord} style={{ fontSize: size * 0.7 }}>Dukora</span>
    </span>
  );
}
