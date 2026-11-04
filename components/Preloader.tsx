'use client';
import { useEffect, useState } from 'react';
import { HORIZONTAAL } from './logo-data';

const MIN_MS = 1600; // minimaal zichtbaar, gerekend vanaf het begin van het laden
const MAX_MS = 5000; // nooit langer dan dit, ook niet als de pagina traag laadt
const SLEUTEL = 'dukora-intro';

// Het beeldmerk bestaat uit vier losse stukken (de verstekverbindingen). Ze schuiven in volgorde
// naar binnen en vormen samen de D: stijl, bovenbalk, boog, onderbalk.
const STUKKEN = HORIZONTAAL.merk.split(/(?=M)/).filter(Boolean);
const VOLGORDE: { i: number; x: number; y: number; d: number }[] = [
  { i: 3, x: -16, y: 0, d: 0 }, // linkerstijl
  { i: 2, x: 0, y: -16, d: 1 }, // bovenbalk
  { i: 1, x: 16, y: 0, d: 2 }, // boog rechts
  { i: 0, x: 0, y: 16, d: 3 }, // onderbalk
];

/**
 * Laadscherm bij het eerste bezoek van een sessie. De D wordt als kozijnframe in elkaar gezet,
 * daarna verschijnt het woordmerk en trekt het scherm weg. Verborgen bij `prefers-reduced-motion`,
 * zonder JavaScript en bij een volgend bezoek in dezelfde sessie (zie het script in layout.tsx).
 */
export default function Preloader() {
  const [stap, setStap] = useState<'zichtbaar' | 'weg' | 'klaar'>('zichtbaar');

  useEffect(() => {
    let gezien = false;
    try { gezien = !!sessionStorage.getItem(SLEUTEL); } catch {}
    if (gezien || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStap('klaar'); return; }

    const root = document.documentElement;
    const oud = root.style.overflow;
    root.style.overflow = 'hidden';
    const timers: number[] = [];
    let afgerond = false;

    const afronden = () => {
      if (afgerond) return;
      afgerond = true;
      const wacht = Math.max(0, MIN_MS - performance.now());
      timers.push(window.setTimeout(() => {
        setStap('weg');
        timers.push(window.setTimeout(() => {
          setStap('klaar');
          root.style.overflow = oud;
          try { sessionStorage.setItem(SLEUTEL, '1'); } catch {}
        }, 550));
      }, wacht));
    };

    if (document.readyState === 'complete') afronden();
    else window.addEventListener('load', afronden, { once: true });
    timers.push(window.setTimeout(afronden, MAX_MS));

    return () => { timers.forEach(clearTimeout); window.removeEventListener('load', afronden); root.style.overflow = oud; };
  }, []);

  if (stap === 'klaar') return null;
  return (
    <div className="preloader" data-weg={stap === 'weg' ? '' : undefined} aria-hidden="true">
      <svg viewBox={HORIZONTAAL.viewBox} className="w-[clamp(220px,30vw,360px)]" fill="#fff">
        <g fillRule="evenodd">
          {VOLGORDE.map((v) => (
            <path key={v.i} d={STUKKEN[v.i]} className="pl-stuk" style={{ ['--x' as string]: `${v.x}px`, ['--y' as string]: `${v.y}px`, ['--d' as string]: v.d }} />
          ))}
        </g>
        <path d={HORIZONTAAL.woord} className="pl-woord" />
      </svg>
    </div>
  );
}
