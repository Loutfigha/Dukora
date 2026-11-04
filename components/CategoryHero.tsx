import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE } from '@/lib/site';
import TLink from './TLink';

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Kruimelpad" className="mb-[clamp(36px,5vw,72px)] flex flex-wrap gap-[10px] text-[14px] text-steen">
      <Link href="/" className="text-steen hover:text-ink">Home</Link>
      {items.map((i) => (
        <span key={i.label} className="flex gap-[10px]"><span aria-hidden>/</span>
          {i.href ? <Link href={i.href} className="text-steen hover:text-ink">{i.label}</Link> : <span className="text-ink" aria-current="page">{i.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export default function CategoryHero({ crumbs, eyebrow, title, intro, children }: {
  crumbs: { label: string; href?: string }[]; eyebrow?: string; title: string; intro: string; children?: ReactNode;
}) {
  return (
    <section>
      <div className="wrap pb-[clamp(48px,6vw,96px)] pt-[clamp(40px,5vw,72px)]">
        <Breadcrumb items={crumbs} />
        <div className="grid items-end gap-[clamp(28px,4vw,72px)] nav:grid-cols-[1.25fr_1fr]">
          <div>
            {eyebrow && <p className="label mb-6">{eyebrow}</p>}
            <h1 className="t-page">{title}</h1>
          </div>
          <div>
            <p className="lede">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TLink href="/offerte-aanvragen" track="cta_offerte_pdp" className="btn-primary px-7 py-[17px]">Vraag een offerte aan</TLink>
              <TLink href={SITE.whatsapp} track="whatsapp_pdp" className="btn-ghost px-7 py-[17px]">WhatsApp ons</TLink>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
