export const SITE = {
  name: 'Dukora',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.dukora.nl',
  phone: '+31 6 29 622 245',
  phoneHref: 'tel:+31629622245',
  whatsapp: 'https://wa.me/31629622245',
  email: 'info@dukora.nl',
  description:
    'Dukora — PVC ramen, PVC deuren, PVC schuifsystemen en horren. Eigen montageteams, persoonlijk advies, vrijblijvende offerte. Heel Nederland.',
} as const;

export const NAV = [
  { href: '/pvc-ramen', label: 'PVC ramen', long: 'PVC ramen' },
  { href: '/pvc-deuren', label: 'PVC deuren', long: 'PVC deuren' },
  { href: '/pvc-schuifsystemen', label: 'Schuifsystemen', long: 'PVC schuifsystemen' },
  { href: '/horren', label: 'Horren', long: 'Horren' },
  { href: '/over-ons', label: 'Over ons', long: 'Over ons' },
  { href: '/contact', label: 'Contact', long: 'Contact' },
] as const;

/**
 * Inhoud die pas live gaat als er echte gegevens zijn. Zolang ze op false staan, verschijnt er
 * niets met [placeholders] op de site. Zet NEXT_PUBLIC_KVK / NEXT_PUBLIC_BTW in de omgeving
 * zodra de bedrijfsgegevens bekend zijn.
 */
export const LIVE = {
  projecten: false,
  kvk: process.env.NEXT_PUBLIC_KVK ?? '',
  btw: process.env.NEXT_PUBLIC_BTW ?? '',
};
