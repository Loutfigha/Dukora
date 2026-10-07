export type OfferteForm = {
  materiaal: string;
  onderdelen: string[];
  aantal: string;
  woning: string;
  postcode: string;
  huisnummer: string;
  naam: string;
  email: string;
  tel: string;
  opmerking: string;
};

export const EMPTY_FORM: OfferteForm = {
  materiaal: '', onderdelen: [], aantal: '', woning: '', postcode: '', huisnummer: '',
  naam: '', email: '', tel: '', opmerking: '',
};

export type Errors = Partial<Record<keyof OfferteForm, string>>;

const POSTCODE = /^\s*[1-9][0-9]{3}\s?[a-zA-Z]{2}\s*$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/** Valideert één stap; geeft null terug als alles klopt. Ook server-side gebruikt. */
export function validateStep(step: number, f: OfferteForm): Errors | null {
  const e: Errors = {};
  switch (step) {
    case 1: if (!f.materiaal) e.materiaal = 'Kies een materiaal of geef aan dat u het nog niet weet.'; break;
    case 2: if (!f.onderdelen.length) e.onderdelen = 'Selecteer minimaal één onderdeel.'; break;
    case 3: if (!f.aantal) e.aantal = 'Geef een indicatie van het aantal.'; break;
    case 4: if (!f.woning) e.woning = 'Kies uw woningtype.'; break;
    case 5:
      if (!POSTCODE.test(f.postcode)) e.postcode = 'Vul een geldige postcode in, bijvoorbeeld 1234 AB.';
      if (!f.huisnummer.trim()) e.huisnummer = 'Vul uw huisnummer in.';
      break;
    case 6:
      if (f.naam.trim().length < 2) e.naam = 'Vul uw naam in.';
      if (!EMAIL.test(f.email)) e.email = 'Vul een geldig e-mailadres in.';
      if (f.tel.replace(/[^0-9]/g, '').length < 9) e.tel = 'Vul een telefoonnummer in waarop we u kunnen bereiken.';
      break;
  }
  return Object.keys(e).length ? e : null;
}

export function validateAll(f: OfferteForm): { step: number; errors: Errors } | null {
  for (let s = 1; s <= 6; s++) {
    const errors = validateStep(s, f);
    if (errors) return { step: s, errors };
  }
  return null;
}

export function validateContact(c: { naam: string; tel: string; email: string; bericht: string }) {
  const e: Record<string, string> = {};
  if (c.naam.trim().length < 2) e.naam = 'Vul uw naam in.';
  if (!EMAIL.test(c.email)) e.email = 'Vul een geldig e-mailadres in.';
  if (c.tel.replace(/[^0-9]/g, '').length < 9) e.tel = 'Vul een telefoonnummer in waarop we u kunnen bereiken.';
  return Object.keys(e).length ? e : null;
}
