'use client';
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import Photo from './Photo';

export default function BeforeAfter({ voor, na }: { voor?: string; na?: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFrom = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100)));
  };
  const down = (e: PointerEvent) => { dragging.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); setFrom(e.clientX); };
  const move = (e: PointerEvent) => { if (dragging.current) setFrom(e.clientX); };
  const up = () => { dragging.current = false; };
  const key = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos((p) => Math.max(2, p - 5)); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setPos((p) => Math.min(98, p + 5)); }
  };

  return (
    <div
      ref={box}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className="relative mt-11 aspect-[16/9] w-full cursor-ew-resize touch-none select-none overflow-hidden bg-[#1A1D21]"
    >
      <div className="absolute inset-0">
        <Photo src={na} alt="Woning na plaatsing van de nieuwe kozijnen" placeholder="NA — woning met nieuwe kozijnen (zelfde standpunt)" />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo src={voor} alt="Woning vóór de vervanging van de kozijnen" placeholder="VOOR — dezelfde woning met oude kozijnen" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white" style={{ left: `${pos}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Vergelijk voor en na"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={key}
        className="absolute inset-y-0 flex w-11 -translate-x-1/2 items-center justify-center focus-visible:outline-none"
        style={{ left: `${pos}%` }}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-ink shadow-[0_6px_22px_rgba(0,0,0,.35)]">↔</span>
      </div>
      <span className="pointer-events-none absolute left-[18px] top-[18px] bg-[rgba(10,12,14,.72)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[.16em] text-white">Voor</span>
      <span className="pointer-events-none absolute right-[18px] top-[18px] bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[.16em] text-ink">Na</span>
    </div>
  );
}
