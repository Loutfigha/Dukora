import nodemailer from 'nodemailer';

type Mail = { to: string; subject: string; text: string; replyTo?: string };

const afzender = () => process.env.MAIL_FROM ?? 'Dukora <info@dukora.nl>';

/**
 * Verstuurt een e-mail. Volgorde:
 * 1. SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS): bv. de mailbox op uw eigen domein bij Hostinger.
 * 2. Resend (RESEND_API_KEY).
 * 3. Niets ingesteld: alleen loggen (handig bij ontwikkelen).
 * MAIL_FROM moet een adres op uw eigen domein zijn, bv. "Dukora <info@dukora.nl>".
 */
export async function sendMail(opts: Mail) {
  if (process.env.SMTP_HOST) {
    const poort = Number(process.env.SMTP_PORT ?? 465);
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: poort,
      secure: poort === 465, // 465 = direct versleuteld; 587 gebruikt STARTTLS
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
    await transport.sendMail({ from: afzender(), to: opts.to, subject: opts.subject, text: opts.text, replyTo: opts.replyTo });
    return;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log('[mail:dev]', opts.subject, '→', opts.to, '\n' + opts.text);
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: afzender(), to: opts.to, subject: opts.subject, text: opts.text, reply_to: opts.replyTo }),
  });
  if (!res.ok) throw new Error(`Mail verzenden mislukt (${res.status})`);
}
