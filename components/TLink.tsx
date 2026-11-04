'use client';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { trackCta } from '@/lib/track';
import WhatsAppIcon from './WhatsAppIcon';

type Props = Omit<ComponentProps<'a'>, 'href'> & { href: string; track?: string; children: ReactNode };

/** Link met optionele dataLayer-tracking. Externe/tel/mailto-links worden gewone <a>'s. */
export default function TLink({ href, track, onClick, children, ...rest }: Props) {
  const handle: ComponentProps<'a'>['onClick'] = (e) => {
    if (track) trackCta(track);
    onClick?.(e);
  };
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const whatsapp = href.startsWith('https://wa.me');
  const inhoud = whatsapp ? <span className="inline-flex items-center gap-2"><WhatsAppIcon />{children}</span> : children;
  if (external) {
    const blank = href.startsWith('http');
    return (
      <a href={href} onClick={handle} {...(blank ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
        {inhoud}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
