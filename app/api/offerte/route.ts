import { bad, limited, ok } from '@/lib/api';
import { validateAll, type OfferteForm } from '@/lib/offerte';
import { sendMail } from '@/lib/mail';
import { SITE } from '@/lib/site';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) return bad('Te veel aanvragen. Probeer het later opnieuw.', 429);

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return bad('Ongeldige aanvraag.'); }

  if (typeof b.website === 'string' && b.website) return ok(); // honeypot: doe alsof het gelukt is

  const str = (v: unknown, max = 2000) => (typeof v === 'string' ? v.slice(0, max) : '');
  const f: OfferteForm = {
    materiaal: str(b.materiaal, 50),
    onderdelen: Array.isArray(b.onderdelen) ? b.onderdelen.map((x) => str(x, 50)).slice(0, 10) : [],
    aantal: str(b.aantal, 50),
    woning: str(b.woning, 50),
    postcode: str(b.postcode, 12),
    huisnummer: str(b.huisnummer, 20),
    naam: str(b.naam, 120),
    email: str(b.email, 200),
    tel: str(b.tel, 40),
    opmerking: str(b.opmerking, 3000),
  };
  if (validateAll(f)) return bad('Controleer uw gegevens.');

  const text = [
    `Naam: ${f.naam}`, `E-mail: ${f.email}`, `Telefoon: ${f.tel}`, '',
    `Materiaal: ${f.materiaal}`, `Onderdelen: ${f.onderdelen.join(', ')}`, `Aantal kozijnen: ${f.aantal}`,
    `Woningtype: ${f.woning}`, `Adres: ${f.postcode} ${f.huisnummer}`, '', `Opmerking: ${f.opmerking || '-'}`,
  ].join('\n');

  try {
    await sendMail({ to: process.env.OFFERTE_TO ?? SITE.email, subject: `Nieuwe offerteaanvraag — ${f.naam}`, text, replyTo: f.email });
    await sendMail({
      to: f.email,
      subject: 'Wij hebben uw offerteaanvraag ontvangen',
      text: `Beste ${f.naam},\n\nBedankt voor uw aanvraag. Een van onze specialisten neemt binnen twee werkdagen contact met u op.\n\nLiever direct contact? Bel of app ons op ${SITE.phone}.\n\nMet vriendelijke groet,\nDukora`,
    });
  } catch (e) {
    console.error(e);
    return bad('Versturen mislukt.', 502);
  }
  return ok();
}
