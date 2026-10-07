import type { Metadata } from 'next';
import OfferteForm from '@/components/OfferteForm';

export const metadata: Metadata = {
  title: 'Offerte aanvragen — vrijblijvend, in zeven korte vragen',
  description: 'Vraag een vrijblijvende offerte aan voor kunststof, aluminium of houten kozijnen. Zeven korte vragen, binnen twee werkdagen reactie van een specialist.',
  alternates: { canonical: '/offerte-aanvragen' },
};

export default function Page() {
  return (
    <main>
      <section className="wrap pb-[clamp(72px,8vw,110px)] pt-[clamp(40px,5vw,68px)]">
        <OfferteForm />
      </section>
    </main>
  );
}
