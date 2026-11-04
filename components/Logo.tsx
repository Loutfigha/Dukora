import { BEELDMERK, BEELDMERK_KLEIN, GESTAPELD, HORIZONTAAL } from './logo-data';

/**
 * Dukora-beeldmerk (de verstek-D) uit de aangeleverde logobestanden.
 * Onder 32 px gebruiken we de massieve versie zonder verstekvoegen, zoals de brand guide voorschrijft.
 */
export function DMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false" className={className} fill="currentColor" fillRule="evenodd">
      <path d={size < 32 ? BEELDMERK_KLEIN : BEELDMERK} />
    </svg>
  );
}

type Variant = 'primair' | 'gestapeld' | 'beeldmerk';

/**
 * Logo volgens de brand guide. De kleur komt van de tekstkleur van de ouder:
 * Bos op licht (primair), wit op Bos (negatief), Salie op Nacht (gestapeld, met wit woordmerk).
 * `size` is de totale hoogte van het logo in px (bij `beeldmerk` de zijde).
 */
export default function Logo({ variant = 'primair', className = '', size = 32, woordKleur }: { variant?: Variant; className?: string; size?: number; woordKleur?: string }) {
  if (variant === 'beeldmerk') return <DMark size={size} className={className} />;
  const g = variant === 'gestapeld';
  const l = g ? GESTAPELD : HORIZONTAAL;
  const [, , w, h] = l.viewBox.split(' ').map(Number);
  const hoogte = size;
  const breedte = hoogte * (w / h);
  return (
    <svg width={breedte} height={hoogte} viewBox={l.viewBox} role="img" aria-label="Dukora" className={className}>
      <path d={l.merk} fill="currentColor" fillRule="evenodd" />
      <path d={l.woord} fill={woordKleur ?? 'currentColor'} />
    </svg>
  );
}
