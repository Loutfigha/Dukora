export const SITE = {
  name: 'Dukora',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.dukora.nl',
  phone: '+31 6 29 622 245',
  phoneHref: 'tel:+31629622245',
  whatsapp: 'https://wa.me/31629622245',
  email: 'info@dukora.nl',
  description:
    'Dukora — kunststof, aluminium en houten kozijnen. Eigen montageteams, persoonlijk advies, vrijblijvende offerte. Heel Nederland.',
} as const;

export const NAV = [
  { href: '/kunststof-kozijnen', label: 'Kunststof', long: 'Kunststof kozijnen' },
  { href: '/aluminium-kozijnen', label: 'Aluminium', long: 'Aluminium kozijnen' },
  { href: '/houten-kozijnen', label: 'Hout', long: 'Houten kozijnen' },
  { href: '/projecten', label: 'Projecten', long: 'Projecten' },
  { href: '/over-ons', label: 'Over ons', long: 'Over ons' },
  { href: '/contact', label: 'Contact', long: 'Contact' },
] as const;
