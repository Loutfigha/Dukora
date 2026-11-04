import type { Config } from 'tailwindcss';

/**
 * Kleuren komen uit de wereld van het kozijn:
 * glas (achtergrond), wit (RAL 9016), antraciet (RAL 7016), dennengroen (RAL 6009).
 * De oude tokennamen (ink, paper, accent, line…) wijzen naar dezelfde set, zodat bestaande klassen blijven werken.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        glas: '#F3F5F4',
        wit: '#FFFFFF',
        ink: '#1F2427',
        'ink-deep': '#161B1D',
        dennen: '#263B31',
        'dennen-diep': '#1B2B24',
        'dennen-licht': '#34503F',
        salie: '#B8CFC0',
        mist: '#E8EDEA',
        lijn: '#D6DDD9',
        steen: '#58635D',
        // legacy aliassen
        paper: '#F3F5F4',
        'paper-2': '#E8EDEA',
        field: '#FFFFFF',
        line: '#D6DDD9',
        'line-2': '#DDE3E0',
        'line-3': '#C4CDC8',
        accent: '#263B31',
        'accent-hover': '#1B2B24',
        'accent-hover-dark': '#34503F',
        'accent-light': '#B8CFC0',
        'text-2': '#1F2427',
        'text-3': '#3A4540',
        'text-4': '#58635D',
        'text-4b': '#58635D',
        'text-5': '#66716B',
        error: '#A8372A',
        'wa-dot': '#4FD160',
      },
      fontFamily: {
        sans: ['var(--font-body)', "'Helvetica Neue'", 'Helvetica', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      borderRadius: { DEFAULT: '0' },
      screens: { nav: '961px' },
      maxWidth: { site: '1360px' },
    },
  },
  plugins: [],
};
export default config;
