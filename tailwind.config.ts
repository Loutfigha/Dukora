import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101215',
        'ink-deep': '#0E1013',
        paper: '#F6F4F0',
        'paper-2': '#EFEBE4',
        field: '#FCFBF9',
        line: '#E1DCD3',
        'line-2': '#E4E0D9',
        'line-3': '#DDD8CF',
        accent: '#A9713F',
        'accent-hover': '#8C5C31',
        'accent-hover-dark': '#B87F49',
        'accent-light': '#D8A874',
        'text-2': '#2A2E34',
        'text-3': '#4A4F56',
        'text-4': '#5A5F66',
        'text-4b': '#6B6F76',
        'text-5': '#8A8F96',
        error: '#B03A2B',
        'wa-dot': '#4FD160',
      },
      fontFamily: {
        sans: ['var(--font-schibsted)', "'Helvetica Neue'", 'Helvetica', 'sans-serif'],
      },
      borderRadius: { DEFAULT: '0' },
      screens: { nav: '961px' },
      maxWidth: { site: '1280px' },
    },
  },
  plugins: [],
};
export default config;
