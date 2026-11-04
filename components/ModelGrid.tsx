'use client';
import { useState } from 'react';
import type { DeurCollectie } from '@/lib/catalogus';

/** Alle panelen/modellen van een collectie, met een tab per variant. De tekeningen zijn lichte SVG's. */
export default function ModelGrid({ variants }: { variants: DeurCollectie['variants'] }) {
  const [active, setActive] = useState(0);
  const v = variants[active];
  return (
    <div>
      {variants.length > 1 && (
        <div role="tablist" aria-label="Variant" className="mb-8 flex flex-wrap gap-3">
          {variants.map((x, i) => (
            <button
              key={x.slug}
              role="tab"
              type="button"
              id={`tab-${x.slug}`}
              aria-selected={i === active}
              aria-controls="modellen"
              onClick={() => setActive(i)}
              className={`border px-5 py-[13px] text-[15.5px] font-medium ${i === active ? 'border-dennen bg-dennen text-white' : 'border-line-3 bg-transparent text-text-3 hover:border-ink hover:text-ink'}`}
            >
              {x.name} <span className="font-normal opacity-70">({x.models.length})</span>
            </button>
          ))}
        </div>
      )}
      <ul id="modellen" role="tabpanel" aria-labelledby={variants.length > 1 ? `tab-${v.slug}` : undefined} className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 md:grid-cols-4 nav:grid-cols-5 [@media(min-width:1200px)]:grid-cols-6">
        {v.models.map((m) => (
          <li key={m.img} className="bg-glas">
            <div className="flex h-[210px] items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.img} alt={`Model ${m.code}`} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
            </div>
            <p className="px-3 pb-3 text-center text-[14px] font-medium text-steen">{m.code}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
