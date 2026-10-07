import type { Metadata } from 'next';
import { Schibsted_Grotesk } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const font = Schibsted_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-schibsted', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Dukora — Kunststof, aluminium en houten kozijnen | Heel Nederland', template: '%s | Dukora' },
  description: SITE.description,
  openGraph: { siteName: 'Dukora', locale: 'nl_NL', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={font.variable}>
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
