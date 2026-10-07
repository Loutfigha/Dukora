import { bad, limited, ok } from '@/lib/api';
import { validateContact } from '@/lib/offerte';
import { sendMail } from '@/lib/mail';
import { SITE } from '@/lib/site';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) return bad('Te veel berichten. Probeer het later opnieuw.', 429);

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return bad('Ongeldig bericht.'); }
  if (typeof b.website === 'string' && b.website) return ok();

  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '');
  const c = { naam: str(b.naam, 120), tel: str(b.tel, 40), email: str(b.email, 200), bericht: str(b.bericht, 3000) };
  if (validateContact(c)) return bad('Controleer uw gegevens.');

  try {
    await sendMail({
      to: process.env.CONTACT_TO ?? SITE.email,
      subject: `Contactformulier — ${c.naam}`,
      text: `Naam: ${c.naam}\nTelefoon: ${c.tel}\nE-mail: ${c.email}\n\n${c.bericht || '-'}`,
      replyTo: c.email,
    });
  } catch (e) {
    console.error(e);
    return bad('Versturen mislukt.', 502);
  }
  return ok();
}
