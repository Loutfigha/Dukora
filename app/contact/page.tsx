import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import TLink from '@/components/TLink';
import ContactForm from '@/components/ContactForm';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Contact — bel, app of laat uw nummer achter',
  description: 'Neem contact op met Dukora via telefoon, WhatsApp of e-mail. Wij werken door heel Nederland en bellen u binnen één werkdag terug.',
  alternates: { canonical: '/contact' },
};

const blok = 'block border-t border-lijn py-7 text-ink hover:text-dennen';
const lab = 'block text-[14px] font-semibold text-steen';
const val = 'display mt-2 block text-[clamp(28px,3.2vw,44px)]';

export default function Contact() {
  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HomeAndConstructionBusiness',
          name: 'Dukora',
          url: SITE.url,
          telephone: SITE.phone,
          email: SITE.email,
          areaServed: 'NL',
          openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:30' }],
        }}
      />
      <section className="wrap pb-[clamp(72px,8vw,128px)] pt-[clamp(56px,8vw,128px)]">
        <h1 className="t-page max-w-[14ch]">Bel, app of laat uw nummer achter.</h1>
        <div className="mt-[clamp(44px,5vw,72px)] grid items-start gap-[clamp(36px,5vw,80px)] nav:grid-cols-2">
          <div>
            <TLink href={SITE.phoneHref} track="tel_contact" className={blok}><span className={lab}>Telefoon</span><span className={val}>{SITE.phone}</span></TLink>
            <TLink href={SITE.whatsapp} track="whatsapp_contact" noIcon className={blok}><span className={`${lab} flex items-center gap-2`}><WhatsAppIcon />WhatsApp</span><span className={val}>Stuur een bericht</span></TLink>
            <TLink href={`mailto:${SITE.email}`} className={blok}><span className={lab}>E-mail</span><span className={val}>{SITE.email}</span></TLink>
            <div className="border-t border-lijn py-7">
              <span className={lab}>Openingstijden</span>
              <div className="mt-[14px] max-w-[420px] text-[17px]">
                {[['Maandag – vrijdag', '08:00 – 17:30'], ['Zaterdag', 'Op afspraak'], ['Zondag', 'Gesloten']].map(([d, t]) => (
                  <span key={d} className="flex justify-between gap-4 py-[6px]"><span>{d}</span><span className="font-medium">{t}</span></span>
                ))}
              </div>
              <p className="mt-4 max-w-[460px] text-[15px] leading-[1.6] text-text-4b">Showroombezoek gaat op afspraak, zodat er altijd iemand voor u vrij is.</p>
            </div>
            <div className="border-t border-lijn py-7">
              <span className={lab}>Werkgebied</span>
              <p className="mt-3 max-w-[460px] text-[17px] leading-[1.6] text-text-3">Wij werken door heel Nederland. Voor inmeten en montage rekenen we geen voorrijkosten.</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
