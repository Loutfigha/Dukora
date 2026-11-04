import Image from 'next/image';
import type { ReactNode } from 'react';

/** Foto in een kozijnframe: witte sponning, dunne buitenlijn en een fijne binnenlijn rond het "glas". */
export default function Frame({ src, alt, aspect = 'aspect-[4/5]', priority, sizes, children, className = '' }: {
  src: string; alt: string; aspect?: string; priority?: boolean; sizes?: string; children?: ReactNode; className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="border border-ink/[.14] bg-white p-3 sm:p-4">
        <div className={`relative overflow-hidden ${aspect}`}>
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes ?? '(min-width:961px) 40vw, 90vw'} className="object-cover" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/20" />
        </div>
      </div>
      {children}
    </div>
  );
}
