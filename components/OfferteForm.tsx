'use client';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { EMPTY_FORM, validateAll, validateStep, type Errors, type OfferteForm } from '@/lib/offerte';
import { push } from '@/lib/track';
import { SITE } from '@/lib/site';
import TLink from './TLink';
import Arrow from './Arrow';

const STORE = 'dukora-offerte';
const TOTAL = 7;

const MATERIAAL = ['Kunststof', 'Aluminium', 'Hout', 'Weet ik nog niet'];
const ONDERDELEN = ['Kozijnen', 'Deuren', 'Schuifpui', 'Gevel', 'Meerdere onderdelen'];
const AANTAL = ['1 tot 5', '6 tot 10', '11 tot 20', 'Meer dan 20', 'Weet ik niet'];
const WONING = ['Tussenwoning', 'Hoekwoning', 'Twee onder een kap', 'Vrijstaand', 'Appartement', 'Anders'];

const legend = 'p-0 text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.15] tracking-[-.03em]';
const hint = 'mt-3 text-[15.5px] text-text-4b';

function Options({ name, type, values, labels, selected, onChange, min, errId }: {
  name: string; type: 'radio' | 'checkbox'; values: string[]; labels?: Record<string, string>;
  selected: string[]; onChange: (v: string) => void; min: number; errId?: string;
}) {
  return (
    <div className="mt-[26px] grid gap-3" style={{ gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))` }}>
      {values.map((v, i) => (
        <label key={v} className="opt">
          <input type={type} name={name} value={v} checked={selected.includes(v)} onChange={() => onChange(v)} aria-describedby={i === 0 ? errId : undefined} />
          <span className="face">{labels?.[v] ?? v}</span>
        </label>
      ))}
    </div>
  );
}

function Field({ label, name, type = 'text', value, onChange, placeholder, error, autoComplete }: {
  label: string; name: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; error?: string; autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13.5px] font-semibold">{label}</span>
      <input
        className="input" type={type} name={name} value={value} placeholder={placeholder} autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `err-${name}` : undefined}
      />
    </label>
  );
}

const Err = ({ id, children }: { id: string; children?: string }) =>
  children ? <p id={`err-${id}`} className="field-err !mt-2 first:!mt-[14px]">{children}</p> : null;

export default function OfferteFormView() {
  const [f, setF] = useState<OfferteForm>(EMPTY_FORM);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Herstel invoer uit sessionStorage en stap uit ?stap=
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE);
      if (raw) setF({ ...EMPTY_FORM, ...JSON.parse(raw) });
    } catch {}
    const s = Number(new URLSearchParams(location.search).get('stap'));
    if (s >= 1 && s <= TOTAL) setStep(s);
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { sessionStorage.setItem(STORE, JSON.stringify(f)); } catch {}
  }, [f, hydrated]);

  const set = <K extends keyof OfferteForm>(k: K, v: OfferteForm[K]) => setF((p) => ({ ...p, [k]: v }));

  const goto = (s: number) => {
    setStep(s);
    history.replaceState(null, '', `?stap=${s}`);
    push({ event: 'offerte_step', step: s });
    window.scrollTo({ top: 0 });
  };

  const focusFirstError = (errs: Errors) => {
    const first = Object.keys(errs)[0];
    requestAnimationFrame(() => {
      const el = root.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
    });
  };

  const next = () => {
    const errs = validateStep(step, f);
    if (errs) { setErrors(errs); focusFirstError(errs); return; }
    setErrors({});
    goto(Math.min(TOTAL, step + 1));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < TOTAL) { next(); return; }
    const bad = validateAll(f);
    if (bad) { setErrors(bad.errors); goto(bad.step); focusFirstError(bad.errors); return; }
    setSending(true); setFailed(false);
    try {
      const hp = (root.current?.querySelector<HTMLInputElement>('[name="website"]')?.value) ?? '';
      const res = await fetch('/api/offerte', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, website: hp }) });
      if (!res.ok) throw new Error();
      push({ event: 'offerte_aanvraag', materiaal: f.materiaal, onderdelen: f.onderdelen });
      try { sessionStorage.removeItem(STORE); } catch {}
      setSent(true);
      window.scrollTo({ top: 0 });
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const aside = (
    <aside className="border border-line bg-paper-2 p-[clamp(26px,3vw,38px)] nav:sticky nav:top-[98px]">
      <h2 className="text-[19px] font-semibold tracking-[-.025em]">Wat u van ons kunt verwachten</h2>
      <ul className="m-0 mt-[22px] flex list-none flex-col gap-[14px] p-0">
        {['Vrijblijvend, u zit nergens aan vast', 'Persoonlijk advies van een specialist', 'Transparante offerte, alles gespecificeerd', 'Geen verplichtingen en geen naverkoop'].map((t) => (
          <li key={t} className="flex gap-3 text-[15.5px] leading-[1.5] text-text-2"><span aria-hidden className="font-bold text-accent">✓</span>{t}</li>
        ))}
      </ul>
      <div className="my-[26px] h-px bg-[#DCD6CB]" />
      <p className="text-[15px] leading-[1.6] text-text-3">Liever direct iemand spreken?</p>
      <TLink href={SITE.phoneHref} track="tel_offerte_aside" className="mt-[10px] block text-[21px] font-semibold tracking-[-.03em] text-ink hover:text-accent">{SITE.phone}</TLink>
      <TLink href={SITE.whatsapp} track="whatsapp_offerte_aside" className="mt-3 inline-flex items-center gap-[9px] text-[15px] font-semibold text-accent">WhatsApp ons<Arrow size={13} /></TLink>
    </aside>
  );

  let body: ReactNode;
  if (sent) {
    body = (
      <div className="border-t-[3px] border-accent pt-9" role="status">
        <p className="eyebrow">Aanvraag ontvangen</p>
        <h1 className="mt-5 max-w-[620px] text-[clamp(30px,4.2vw,52px)] font-semibold leading-[1.04] tracking-[-.045em]">Dank u. We nemen binnen twee werkdagen contact op.</h1>
        <p className="body-l mt-5 max-w-[540px] !text-[17px]">U ontvangt een bevestiging per e-mail. Wil het sneller? Stuur een bericht via WhatsApp, dan kijken we vandaag nog naar uw aanvraag.</p>
        <div className="mt-[30px] flex flex-wrap gap-3">
          <TLink href={SITE.whatsapp} track="whatsapp_bedankt" className="btn bg-ink px-[26px] py-[18px] text-base text-white hover:bg-accent hover:text-white">WhatsApp ons</TLink>
          <TLink href="/projecten" className="btn-ghost px-6 py-[18px] text-base">Bekijk onze projecten</TLink>
        </div>
      </div>
    );
  } else {
    const err = (k: keyof OfferteForm) => errors[k];
    body = (
      <div>
        <p className="eyebrow">Offerte aanvragen</p>
        <h1 className="mt-5 max-w-[640px] text-[clamp(30px,4.4vw,54px)] font-semibold leading-[1.02] tracking-[-.045em]">Zeven korte vragen. Daarna weten we genoeg.</h1>
        <p className="body-l mt-5 max-w-[560px] !text-[17px] !leading-[1.6]">U ontvangt geen automatische prijslijst, maar een offerte die past bij uw woning. Duurt ongeveer twee minuten.</p>

        <div className="mt-[clamp(36px,4vw,52px)]">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[13px] font-semibold tracking-[.06em]" aria-live="polite">Stap {step} van {TOTAL}</span>
            <span className="text-[13px] text-text-5">Vrijblijvend · geen verplichtingen</span>
          </div>
          <div className="mt-3 h-[3px] bg-line" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={step}>
            <div className="h-[3px] bg-accent transition-[width] duration-[450ms] ease-[cubic-bezier(.22,.7,.2,1)]" style={{ width: `${Math.round((step / TOTAL) * 100)}%` }} />
          </div>
        </div>

        <form onSubmit={submit} noValidate className="mt-[clamp(32px,4vw,48px)]">
          {step === 1 && (
            <fieldset className="m-0 border-0 p-0">
              <legend className={legend}>Wat voor kozijnen zoekt u?</legend>
              <p className={hint}>Weet u het nog niet? Dat is geen probleem — dan adviseren wij.</p>
              <Options name="materiaal" type="radio" values={MATERIAAL} labels={{ 'Weet ik nog niet': 'Ik weet het nog niet' }} selected={[f.materiaal]} onChange={(v) => set('materiaal', v)} min={200} errId="err-materiaal" />
              <Err id="materiaal">{err('materiaal')}</Err>
            </fieldset>
          )}
          {step === 2 && (
            <fieldset className="m-0 border-0 p-0">
              <legend className={legend}>Wat wilt u vervangen?</legend>
              <p className={hint}>Meerdere antwoorden mogelijk.</p>
              <Options name="onderdelen" type="checkbox" values={ONDERDELEN} selected={f.onderdelen} onChange={(v) => set('onderdelen', f.onderdelen.includes(v) ? f.onderdelen.filter((x) => x !== v) : [...f.onderdelen, v])} min={200} errId="err-onderdelen" />
              <Err id="onderdelen">{err('onderdelen')}</Err>
            </fieldset>
          )}
          {step === 3 && (
            <fieldset className="m-0 border-0 p-0">
              <legend className={legend}>Om hoeveel kozijnen gaat het ongeveer?</legend>
              <p className={hint}>Een schatting is genoeg — exact meten doen wij.</p>
              <Options name="aantal" type="radio" values={AANTAL} selected={[f.aantal]} onChange={(v) => set('aantal', v)} min={170} errId="err-aantal" />
              <Err id="aantal">{err('aantal')}</Err>
            </fieldset>
          )}
          {step === 4 && (
            <fieldset className="m-0 border-0 p-0">
              <legend className={legend}>Wat is uw woningtype?</legend>
              <p className={hint}>Dit bepaalt mede de indeling en de montageduur.</p>
              <Options name="woning" type="radio" values={WONING} labels={{ 'Twee onder een kap': 'Twee-onder-een-kap' }} selected={[f.woning]} onChange={(v) => set('woning', v)} min={190} errId="err-woning" />
              <Err id="woning">{err('woning')}</Err>
            </fieldset>
          )}
          {step === 5 && (
            <fieldset className="m-0 border-0 p-0">
              <legend className={legend}>Waar staat de woning?</legend>
              <p className={hint}>We gebruiken het adres om de montageplanning in te schatten.</p>
              <div className="mt-[26px] grid max-w-[520px] grid-cols-2 gap-[14px]">
                <Field label="Postcode" name="postcode" value={f.postcode} onChange={(v) => set('postcode', v)} placeholder="1234 AB" error={err('postcode')} autoComplete="postal-code" />
                <Field label="Huisnummer" name="huisnummer" value={f.huisnummer} onChange={(v) => set('huisnummer', v)} placeholder="12 A" error={err('huisnummer')} />
              </div>
              <Err id="postcode">{err('postcode')}</Err>
              <Err id="huisnummer">{err('huisnummer')}</Err>
            </fieldset>
          )}
          {step === 6 && (
            <fieldset className="m-0 border-0 p-0">
              <legend className={legend}>Hoe kunnen we u bereiken?</legend>
              <p className={hint}>Eén van onze specialisten neemt binnen twee werkdagen contact op.</p>
              <div className="mt-[26px] flex max-w-[520px] flex-col gap-[14px]">
                <Field label="Naam" name="naam" value={f.naam} onChange={(v) => set('naam', v)} error={err('naam')} autoComplete="name" />
                <Field label="E-mailadres" name="email" type="email" value={f.email} onChange={(v) => set('email', v)} error={err('email')} autoComplete="email" />
                <Field label="Telefoonnummer" name="tel" type="tel" value={f.tel} onChange={(v) => set('tel', v)} error={err('tel')} autoComplete="tel" />
              </div>
              <Err id="naam">{err('naam')}</Err>
              <Err id="email">{err('email')}</Err>
              <Err id="tel">{err('tel')}</Err>
            </fieldset>
          )}
          {step === 7 && (
            <fieldset className="m-0 border-0 p-0">
              <legend className={legend}>Wilt u nog iets kwijt?</legend>
              <p className={hint}>Bijvoorbeeld een kleurwens, een deadline of een lastige situatie op locatie. Niet verplicht.</p>
              <textarea name="opmerking" rows={6} value={f.opmerking} onChange={(e) => set('opmerking', e.target.value)} className="input mt-6 max-w-[640px] resize-y" />
              {/* Honeypot tegen spam */}
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            </fieldset>
          )}

          <div className="mt-[34px] flex flex-wrap items-center gap-3 border-t border-line pt-[26px]">
            {step > 1 && (
              <button type="button" onClick={() => { setErrors({}); goto(step - 1); }} className="btn-ghost cursor-pointer bg-transparent px-6 py-[17px] text-[15.5px]">Vorige</button>
            )}
            {step < TOTAL ? (
              <button type="button" onClick={next} className="btn cursor-pointer bg-ink px-7 py-[18px] text-base text-white hover:bg-accent">Volgende<Arrow /></button>
            ) : (
              <button type="submit" disabled={sending} data-track="offerte_submit" onClick={() => push({ event: 'cta_click', cta: 'offerte_submit' })} className="btn-primary cursor-pointer border-0 px-7 py-[18px] text-base disabled:opacity-60">
                {sending ? 'Versturen…' : 'Vraag mijn vrijblijvende offerte aan'}<Arrow />
              </button>
            )}
          </div>
          {failed && <p role="alert" className="field-err">Versturen is niet gelukt. Probeer het opnieuw of bel ons op {SITE.phone}.</p>}
        </form>
      </div>
    );
  }

  return (
    <div ref={root} className="grid items-start gap-[clamp(36px,5vw,84px)] nav:grid-cols-[1.55fr_1fr]">
      {body}
      {aside}
    </div>
  );
}
