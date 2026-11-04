'use client';
import { useState, type FormEvent } from 'react';
import { push } from '@/lib/track';
import { validateContact } from '@/lib/offerte';

const lbl = 'mb-2 block text-[15px] font-medium';

/** Kort adviesformulier voor in de hero. Gebruikt dezelfde API als het contactformulier. */
export default function AdviesForm({ compact = false, onderwerp = 'de homepage', titel = 'Plan een gratis adviesgesprek', intro = 'Laat uw gegevens achter. Een specialist belt u binnen één werkdag.' }: { compact?: boolean; onderwerp?: string; titel?: string; intro?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? '');
    const data = {
      naam: v('naam'), tel: v('tel'), email: v('email'), website: v('website'),
      bericht: `Adviesgesprek aangevraagd via ${onderwerp}. Woonplaats: ${v('plaats').trim() || 'niet opgegeven'}`,
    };
    const fouten: Record<string, string> = { ...(validateContact(data) ?? {}) };
    if (!v('plaats').trim()) fouten.plaats = 'Vul uw woonplaats in.';
    setErrors(fouten);
    const eerste = ['naam', 'plaats', 'tel', 'email'].find((k) => fouten[k]);
    if (eerste) {
      (form.elements.namedItem(eerste) as HTMLElement | null)?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      push({ event: 'contact_submit', bron: compact ? 'product_adviesgesprek' : 'hero_adviesgesprek' });
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="bg-white p-[clamp(28px,3vw,44px)]">
        <h2 className="t-sub">Bedankt, we hebben uw aanvraag ontvangen.</h2>
        <p className="mt-3 text-[16.5px] leading-[1.6] text-steen">Een van onze specialisten belt u binnen één werkdag voor een afspraak.</p>
      </div>
    );
  }

  const veld = (naam: string, label: string, type = 'text', auto?: string) => (
    <label className="block">
      <span className={lbl}>{label}</span>
      <input name={naam} type={type} autoComplete={auto} aria-invalid={!!errors[naam]} aria-describedby={errors[naam] ? `adv-${naam}` : undefined} className="input" />
      {errors[naam] && <p id={`adv-${naam}`} className="mt-2 text-[14.5px] font-medium text-error">{errors[naam]}</p>}
    </label>
  );

  return (
    <form id="adviesgesprek" onSubmit={onSubmit} noValidate className={`scroll-mt-32 bg-white ${compact ? 'border border-lijn p-7' : 'p-[clamp(28px,3vw,44px)]'}`}>
      <h2 className="t-sub">{titel}</h2>
      <p className="mt-3 text-[16px] leading-[1.55] text-steen">{intro}</p>
      <div className={`mt-7 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        {veld('naam', 'Naam', 'text', 'name')}
        {veld('plaats', 'Woonplaats', 'text', 'address-level2')}
        {veld('tel', 'Telefoonnummer', 'tel', 'tel')}
        {veld('email', 'E-mailadres', 'email', 'email')}
      </div>
      {/* Honeypot tegen spam */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-6 w-full py-[18px] text-[16.5px] disabled:opacity-60">
        {status === 'sending' ? 'Versturen…' : 'Adviesgesprek aanvragen'}
      </button>
      {status === 'failed' && <p role="alert" className="field-err">Versturen is niet gelukt. Probeer het opnieuw of bel ons.</p>}
      <p className="mt-4 text-[13.5px] leading-[1.5] text-steen">Vrijblijvend. Uw gegevens gebruiken we alleen om contact met u op te nemen.</p>
    </form>
  );
}
