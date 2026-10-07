/** Verstuurt een e-mail via Resend als RESEND_API_KEY is gezet; anders loggen we alleen (dev). */
export async function sendMail(opts: { to: string; subject: string; text: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log('[mail:dev]', opts.subject, '→', opts.to, '\n' + opts.text);
    return;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.MAIL_FROM ?? 'Dukora <noreply@dukora.nl>',
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      reply_to: opts.replyTo,
    }),
  });
  if (!res.ok) throw new Error(`Mail verzenden mislukt (${res.status})`);
}
