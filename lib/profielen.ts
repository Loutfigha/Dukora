export type Profiel = {
  slug: string;
  path: string;
  naam: string;
  parent: { naam: string; path: string };
  tagline: string;
  beschrijving: string[];
  afbeelding: { src: string; alt: string };
  kernkleuren: string[];
  kerncijfers: { waarde: string; label: string }[];
  specs: { k: string; v: string }[];
  voordelen: string[];
  catalogus?: string;
  voetnoot: string[];
};

export const IDEAL_7000_NL: Profiel = {
  slug: 'ideal-7000-nl',
  path: '/kunststof-kozijnen/ideal-7000-nl',
  naam: 'Ideal 7000 NL',
  parent: { naam: 'Kunststof kozijnen', path: '/kunststof-kozijnen' },
  tagline: 'Het KOMO-gecertificeerde kunststof profiel, ontwikkeld voor de Nederlandse markt.',
  beschrijving: [
    'De IDEAL is een zeer populair systeem voor warme schrijnwerksystemen. Met hun verschillende opties zijn ze geïnstalleerd in miljoenen huizen over de hele wereld. Gebruikers waarderen het om de thermische en akoestische isolatie, gecombineerd met een uitstekende prijs/prestatieverhouding.',
    'De Ideal 7000 NL is een uitvoering van dit systeem die speciaal voor de Nederlandse markt is ontwikkeld. De profielen kunnen onder een hoek van 45 graden worden gelast met de esthetische V-super-techniek, of onder 90 graden met HVL-technologie. Door dit type laswerk lijken de kozijnen meer op houten constructies.',
    'U kunt de kozijnen bestellen in effen kleuren of met een houtnerfpatroon. De folies kunnen aan de binnen- en buitenzijde worden aangebracht. Doordat u beide zijden onafhankelijk kiest, past de Ideal 7000 NL bij elke gevel en elk interieur.',
    'Het systeem heeft een KOMO-certificaat en inbraakwerendheidsklasse RC2 (volgens EN 1627 / NEN 5096).',
  ],
  afbeelding: {
    src: '/img/ideal-7000-nl.png',
    alt: 'Doorsnede van het Ideal 7000 NL kunststof kozijnprofiel met dubbele beglazing, KOMO-gecertificeerd',
  },
  kernkleuren: ['Crème', 'Wit', 'Antraciet'],
  kerncijfers: [
    { waarde: '0,76', label: 'Uw-waarde W/m²K (bij Ug 0,5, Swiss Spacer Ultimate)*' },
    { waarde: '120 mm', label: 'Inbouwdiepte' },
    { waarde: '5/6', label: 'Kamers' },
    { waarde: '2', label: 'Afdichtingen' },
  ],
  specs: [
    { k: 'Profielvorm', v: 'Met aanslag' },
    { k: 'Certificering', v: 'KOMO-certificaat' },
    { k: 'Inbraakwerendheid', v: 'RC2 (EN 1627 / NEN 5096)' },
    { k: 'Inbouwdiepte', v: '120 mm' },
    { k: 'Beglazing', v: 'Tot 52 mm dik (standaard 24 mm)' },
    { k: 'Kamers', v: '5/6-kamer' },
    { k: 'Afdichtingen', v: '2' },
    { k: 'Veiligheid', v: '2 anti-slampunten per vleugel' },
    { k: 'Versteviging', v: 'Standaard gesloten staal in het frame' },
    { k: 'Lasmethode', v: '45° V-super of 90° HVL' },
    { k: 'Kernkleuren', v: 'Crème, wit, antraciet' },
    { k: 'Afwerking', v: 'Effen kleuren of houtnerf, binnen en buiten apart te kiezen' },
  ],
  voordelen: [
    'KOMO-gecertificeerd en RC2-inbraakwerend',
    'Uw-waarde vanaf 0,76 W/m²K',
    'Uitstraling van hout dankzij V-super- of HVL-lassen',
    'Binnen- en buitenkleur los te kiezen',
  ],
  catalogus: 'https://pliki.ekookna.pl/files/nl/Marketingmateriaal/Catalogus/Catalogus_Product-mini_NL.pdf',
  voetnoot: [
    '* De Uw-waarde is gegeven voor een referentiekozijn van 1230 × 1480 mm.',
    'Deze pagina is geen commercieel aanbod. Het getoonde beeldmateriaal dient ter referentie; werkelijke kleuren en texturen kunnen afwijken. Renderings tonen voorbeelden van profiel- en beglazingscombinaties.',
  ],
};
