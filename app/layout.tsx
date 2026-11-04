import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SITE } from '@/lib/site';
import UtilityBar from '@/components/UtilityBar';
import Header from '@/components/Header';
import TrustBar from '@/components/TrustBar';
import SideTab from '@/components/SideTab';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Preloader from '@/components/Preloader';

const body = localFont({
  src: './fonts/Inter-Variable.woff2',
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

export const viewport: Viewport = { themeColor: '#263B31' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Dukora — PVC ramen, deuren, schuifsystemen en horren | Heel Nederland', template: '%s | Dukora' },
  description: SITE.description,
  openGraph: { siteName: 'Dukora', locale: 'nl_NL', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${body.variable} ${display.variable}`}>
      <head>
        {/* Wie het laadscherm deze sessie al zag, krijgt het niet opnieuw: voorkomt een flits bij het laden. */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('dukora-intro'))document.documentElement.setAttribute('data-intro-gezien','')}catch(e){}" }} />
        <noscript><style>{'.preloader{display:none}'}</style></noscript>
      </head>
      <body>
        <Preloader />
        <UtilityBar />
        <Header />
        <TrustBar />
        {children}
        <CtaBand />
        <Footer />
        <SideTab />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
