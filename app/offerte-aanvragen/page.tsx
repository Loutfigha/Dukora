import type { Metadata } from 'next';
import OfferteForm from '@/components/OfferteForm';

export const metadata: Metadata = {
  title: 'Offerte aanvragen — vrijblijvend, in zeven korte vragen',
  description: 'Vraag een vrijblijvende offerte aan voor PVC ramen, deuren, schuifsystemen of horren. Zeven korte vragen, binnen twee werkdagen reactie van een specialist.',
  alternates: { canonical: '/offerte-aanvragen' },
};

export default function Page() {
  return (
    <main>
      <section className="wrap pb-[clamp(72px,8vw,128px)] pt-[clamp(48px,6vw,96px)]">
        <OfferteForm />
      </section>
    </main>
  );
}
