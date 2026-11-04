import Image from 'next/image';
import Link from 'next/link';
import type { Image as Img } from '@/lib/catalogus';

/** Productplaat: de render staat als object op wit, met veel lucht eromheen. */
export default function ProductCard({ href, title, image, lines, cta = 'Bekijk details' }: {
  href: string; title: string; image: Img; lines: string[]; cta?: string;
}) {
  return (
    <Link href={href} className="group flex h-full flex-col text-ink hover:text-ink">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-glas">
        <Image src={image.src} alt={title} fill sizes="(min-width:961px) 33vw, (min-width:640px) 50vw, 100vw" className="object-contain p-3" />
      </div>
      <h3 className="t-sub mt-6 group-hover:text-dennen">{title}</h3>
      {lines.length > 0 && (
        <ul className="m-0 mt-3 list-none space-y-1 p-0 text-[15.5px] leading-[1.55] text-steen">
          {lines.map((l) => <li key={l}>{l}</li>)}
        </ul>
      )}
      <span className="mt-auto pt-5 text-[15.5px] font-medium text-dennen underline decoration-dennen/30 underline-offset-[6px] group-hover:decoration-dennen">{cta}</span>
    </Link>
  );
}
