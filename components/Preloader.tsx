'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { HORIZONTAAL } from './logo-data';

const SLEUTEL = 'dukora-intro';
const LANG = { min: 1600, uit: 550 };  // eerste bezoek van een tabblad: de volle animatie
const KORT = { min: 700, uit: 400 };   // elke volgende pagina: sneller, zodat het niet hindert
const MAX_MS = 5000;                   // nooit langer wachten dan dit op het laden

// Het beeldmerk bestaat uit vier losse stukken (de verstekverbindingen). Ze schuiven in volgorde
// naar binnen en vormen samen de D: stijl, bovenbalk, boog, onderbalk.
const STUKKEN = HORIZONTAAL.merk.split(/(?=M)/).filter(Boolean);
const VOLGORDE: { i: number; x: number; y: number; d: number }[] = [
  { i: 3, x: -16, y: 0, d: 0 }, // linkerstijl
  { i: 2, x: 0, y: -16, d: 1 }, // bovenbalk
  { i: 1, x: 16, y: 0, d: 2 },  // boog rechts
  { i: 0, x: 0, y: 16, d: 3 },  // onderbalk
];

type Stap = 'zichtbaar' | 'weg' | 'klaar';

/**
 * Laadscherm op elke pagina: de D wordt als kozijnframe in elkaar gezet, daarna verschijnt het
 * woordmerk en trekt het scherm weg. De eerste keer in een tabblad duurt het langer; bij een
 * volgende pagina (verversen, een link, vooruit of terug) is het een snellere versie.
 * Verborgen bij `prefers-reduced-motion` en zonder JavaScript. De inhoud staat altijd in de pagina.
 */
export default function Preloader() {
  const [stap, setStap] = useState<Stap>('zichtbaar');
  const [kort, setKort] = useState(false); // alleen voor paginawissels binnen de site
  const [n, setN] = useState(0);           // verandert bij elke nieuwe weergave, zodat de animatie opnieuw begint
  const pathname = usePathname();
  const eerste = useRef(true);
  const timers = useRef<number[]>([]);
  const oudeOverflow = useRef('');

  const opruimen = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const afspelen = useCallback((modus: typeof LANG, vanafNavigatie: boolean, wachtOpLaden: boolean) => {
    opruimen();
    const root = document.documentElement;
    oudeOverflow.current = root.style.overflow;
    root.style.overflow = 'hidden';
    const start = vanafNavigatie ? 0 : performance.now();
    let afgerond = false;

    const afronden = () => {
      if (afgerond) return;
      afgerond = true;
      const wacht = Math.max(0, modus.min - (performance.now() - start));
      timers.current.push(window.setTimeout(() => {
        setStap('weg');
        timers.current.push(window.setTimeout(() => {
          setStap('klaar');
          root.style.overflow = oudeOverflow.current;
          try { sessionStorage.setItem(SLEUTEL, '1'); } catch {}
        }, modus.uit));
      }, wacht));
    };

    if (!wachtOpLaden || document.readyState === 'complete') afronden();
    else window.addEventListener('load', afronden, { once: true });
    timers.current.push(window.setTimeout(afronden, MAX_MS));
  }, [opruimen]);

  // Eerste weergave van dit document (nieuw tabblad, verversen of een link naar een andere pagina).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStap('klaar'); return; }
    let gezien = false;
    try { gezien = !!sessionStorage.getItem(SLEUTEL); } catch {}
    afspelen(gezien ? KORT : LANG, true, true);
    return () => { opruimen(); document.documentElement.style.overflow = oudeOverflow.current; };
  }, [afspelen, opruimen]);

  // Paginawissel binnen de site (links, vooruit en terug): de snelle versie opnieuw afspelen.
  useEffect(() => {
    if (eerste.current) { eerste.current = false; return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setKort(true);
    setN((x) => x + 1);
    setStap('zichtbaar');
    afspelen(KORT, false, false);
  }, [pathname, afspelen]);

  if (stap === 'klaar') return null;
  return (
    <div key={n} className="preloader" data-kort={kort ? '' : undefined} data-weg={stap === 'weg' ? '' : undefined} aria-hidden="true">
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
