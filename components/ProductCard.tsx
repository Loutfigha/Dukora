import Image from 'next/image';
import Link from 'next/link';
import Arrow from './Arrow';
import type { Image as Img } from '@/lib/catalogus';

export default function ProductCard({ href, title, image, lines, cta = 'Bekijk details' }: {
  href: string; title: string; image: Img; lines: string[]; cta?: string;
}) {
  return (
    <Link href={href} className="group flex h-full flex-col text-ink hover:text-ink">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        <Image src={image.src} alt={`${title}`} fill sizes="(min-width:961px) 33vw, (min-width:640px) 50vw, 100vw" className="object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="mt-5 border-b border-line pb-[14px]">
        <h3 className="text-[clamp(20px,2vw,24px)] font-semibold tracking-[-.03em]">{title}</h3>
      </div>
      {lines.length > 0 && (
        <ul className="m-0 mt-4 list-none space-y-1 p-0 text-[15px] leading-[1.5] text-text-4">
          {lines.map((l) => <li key={l}>{l}</li>)}
        </ul>
      )}
      <span className="mt-auto inline-flex items-center gap-[9px] pt-5 text-[15px] font-semibold text-accent">{cta}<Arrow size={13} /></span>
    </Link>
  );
}
