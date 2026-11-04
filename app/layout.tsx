import type { Metadata } from 'next';
import { Hanken_Grotesk, Newsreader } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const body = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' });
const display = Newsreader({ subsets: ['latin'], weight: ['300', '400', '500'], style: ['normal'], variable: '--font-display', display: 'swap', adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Dukora — PVC ramen, deuren, schuifsystemen en horren | Heel Nederland', template: '%s | Dukora' },
  description: SITE.description,
  openGraph: { siteName: 'Dukora', locale: 'nl_NL', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${body.variable} ${display.variable}`}>
      <body>
        <Header />
        {children}
        <CtaBand />
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
