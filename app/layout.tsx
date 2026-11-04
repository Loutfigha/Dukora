import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const body = localFont({
  src: './fonts/HankenGrotesk-Variable.woff2',
  weight: '400 600',
  variable: '--font-body',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
});
const display = localFont({
  src: './fonts/Newsreader-Variable.woff2',
  weight: '300 500',
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

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
