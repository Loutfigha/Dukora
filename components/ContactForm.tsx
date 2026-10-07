'use client';
import { useState, type FormEvent } from 'react';
import { push } from '@/lib/track';
import { validateContact } from '@/lib/offerte';

const lbl = 'mb-2 block text-[13px] font-semibold text-white/70';

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = { naam: String(fd.get('naam') ?? ''), tel: String(fd.get('tel') ?? ''), email: String(fd.get('email') ?? ''), bericht: String(fd.get('bericht') ?? ''), website: String(fd.get('website') ?? '') };
    const errs = validateContact(data);
    setErrors(errs ?? {});
    if (errs) {
      (e.currentTarget.elements.namedItem(Object.keys(errs)[0]) as HTMLElement | null)?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      push({ event: 'contact_submit' });
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="bg-ink p-[clamp(28px,3.5vw,44px)] text-white">
        <h2 className="text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.1] tracking-[-.03em]">Bedankt, we hebben uw bericht ontvangen.</h2>
        <p className="mt-[14px] text-[15.5px] leading-[1.6] text-white/[.66]">We bellen u binnen één werkdag terug.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="bg-ink p-[clamp(28px,3.5vw,44px)] text-white">
      <h2 className="text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.1] tracking-[-.03em]">Laat uw gegevens achter</h2>
      <p className="mt-[14px] text-[15.5px] leading-[1.6] text-white/[.66]">We bellen u binnen één werkdag terug. Wilt u direct een prijsindicatie? Gebruik dan de <a href="/offerte-aanvragen" className="text-accent-light hover:text-white">offerteaanvraag</a>.</p>
      <div className="mt-7 flex flex-col gap-[14px]">
        {[['naam', 'Naam', 'text'], ['tel', 'Telefoonnummer', 'tel'], ['email', 'E-mailadres', 'email']].map(([n, l, t]) => (
          <label key={n} className="block">
            <span className={lbl}>{l}</span>
            <input name={n} type={t} autoComplete={n === 'naam' ? 'name' : n} aria-invalid={!!errors[n]} aria-describedby={errors[n] ? `err-${n}` : undefined} className="input-dark" />
            {errors[n] && <p id={`err-${n}`} className="mt-2 text-[14.5px] font-medium text-[#F08A7C]">{errors[n]}</p>}
          </label>
        ))}
        <label className="block">
          <span className={lbl}>Waar gaat het over?</span>
          <textarea name="bericht" rows={4} className="input-dark resize-y" />
        </label>
        {/* Honeypot tegen spam */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      </div>
      <button type="submit" disabled={status === 'sending'} className="mt-[22px] w-full bg-accent py-[18px] text-base font-semibold text-white hover:bg-accent-hover-dark disabled:opacity-60">
        {status === 'sending' ? 'Versturen…' : 'Verstuur bericht'}
      </button>
      {status === 'failed' && <p role="alert" className="mt-[14px] text-[14.5px] font-medium text-[#F08A7C]">Versturen is niet gelukt. Probeer het opnieuw of bel ons.</p>}
      <p className="mt-[14px] text-[13px] leading-[1.55] text-white/45">Uw gegevens gebruiken we alleen om contact met u op te nemen.</p>
    </form>
  );
}
