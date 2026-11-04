import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE } from '@/lib/site';
import TLink from './TLink';
import Arrow from './Arrow';

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Kruimelpad" className="mb-[clamp(32px,4vw,54px)] flex flex-wrap gap-[10px] text-[13px] text-text-5">
      <Link href="/" className="text-text-5 hover:text-ink">Home</Link>
      {items.map((i) => (
        <span key={i.label} className="flex gap-[10px]"><span aria-hidden>/</span>
          {i.href ? <Link href={i.href} className="text-text-5 hover:text-ink">{i.label}</Link> : <span className="text-ink" aria-current="page">{i.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export default function CategoryHero({ crumbs, eyebrow, title, intro, children }: {
  crumbs: { label: string; href?: string }[]; eyebrow: string; title: string; intro: string; children?: ReactNode;
}) {
  return (
    <section className="border-b border-line-2">
      <div className="wrap pb-[clamp(40px,4vw,60px)] pt-[clamp(44px,5vw,72px)]">
        <Breadcrumb items={crumbs} />
        <div className="grid items-end gap-[clamp(28px,4vw,64px)] nav:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-[22px] text-[clamp(38px,6vw,78px)] font-semibold leading-none tracking-[-.045em]">{title}</h1>
          </div>
          <div>
            <p className="body-l">{intro}</p>
            <div className="mt-6 flex flex-wrap gap-[10px]">
              <TLink href="/offerte-aanvragen" track="cta_offerte_pdp" className="btn-primary gap-[9px] px-6 py-[17px] text-[15.5px]">Vraag een offerte aan<Arrow size={13} /></TLink>
              <TLink href={SITE.whatsapp} track="whatsapp_pdp" className="btn-ghost gap-[9px] px-[22px] py-[17px] text-[15.5px]">WhatsApp ons</TLink>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
