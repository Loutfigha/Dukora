import type { MetadataRoute } from 'next';

/** Installeerbare web-app: naam, kleuren en de officiële app-iconen uit de brand guide. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dukora — PVC ramen, deuren, schuifsystemen en horren',
    short_name: 'Dukora',
    description: 'Nieuwe kozijnen. Een beter huis. Eigen montageteams, persoonlijk advies, vrijblijvende offerte.',
    lang: 'nl',
    start_url: '/',
    display: 'standalone',
    background_color: '#F3F5F4',
    theme_color: '#263B31',
    icons: [
      { src: '/brand/png/dukora-app-icoon-192px.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/png/dukora-app-icoon-512px.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/brand/png/dukora-app-icoon-512px.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
