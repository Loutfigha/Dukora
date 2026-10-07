export type Product = {
  slug: string;
  path: string;
  nr: string;
  naam: string;
  lede: string;
  intro: string;
  specs: { k: string; v: string }[];
  vw: string[];
  faq: { q: string; a: string }[];
};

const spec = (rows: [string, string][]) => rows.map(([k, v]) => ({ k, v }));
const faq = (rows: [string, string][]) => rows.map(([q, a]) => ({ q, a }));

export const PRODUCTS: Product[] = [
  {
    slug: 'kunststof-kozijnen', path: '/kunststof-kozijnen', nr: '01', naam: 'Kunststof kozijnen',
    lede: 'Duurzaam, onderhoudsarm en uitstekend isolerend.',
    intro: 'Het meest gekozen materiaal bij een complete vervanging. Kunststof profielen vragen geen schilderwerk, isoleren uitstekend en zijn er inmiddels in kleuren en houtstructuren die van echt hout nauwelijks te onderscheiden zijn.',
    specs: spec([['Profiel', '5- of 6-kamer, 70 tot 88 mm inbouwdiepte'], ['Isolatie', 'Uf-waarde vanaf 1,0 W/m²K'], ['Beglazing', 'HR++ (U 1,1) of triple (U 0,6)'], ['Kleuren', 'Wit, crème, antraciet, zwart en houtdecors'], ['Onderhoud', 'Schoonmaken met water en zeep'], ['Garantie', '[X] jaar op product, [X] jaar op montage']]),
    vw: ['Geen schilderwerk, jaren achtereen', 'Zeer goede isolatiewaarden per euro', 'Wit binnen, antraciet buiten is mogelijk', 'Ook geschikt voor draai-kiepramen en deuren'],
    faq: faq([['Wordt kunststof geel?', 'Moderne profielen zijn UV-stabiel. Vergeling zoals bij oude kunststof kozijnen uit de jaren tachtig komt bij hedendaagse profielen niet meer voor.'], ['Kan ik dezelfde indeling houden?', 'Ja. We meten elk kozijn apart in en houden de bestaande indeling aan, tenzij u juist meer glas of een ander raamtype wilt.'], ['Hoe lang duurt de plaatsing?', 'Een gemiddelde woning doen we in één tot drie dagen. U hoort van tevoren welke dagen dat zijn.'], ['Moet ik het stucwerk laten herstellen?', 'We werken de aansluitingen netjes af. Waar herstel nodig is, staat dat in de offerte.']]),
  },
  {
    slug: 'aluminium-kozijnen', path: '/aluminium-kozijnen', nr: '02', naam: 'Aluminium kozijnen',
    lede: 'Strak, modern en sterk.',
    intro: 'Aluminium is sterk genoeg voor grote glasvlakken en brede schuifpuien met smalle profielen. Daarmee is het de logische keuze bij moderne architectuur, aanbouwen en woningen waar zoveel mogelijk daglicht binnen moet komen.',
    specs: spec([['Profiel', 'Thermisch onderbroken, 65 tot 90 mm'], ['Isolatie', 'Uf-waarde vanaf 1,3 W/m²K'], ['Beglazing', 'HR++ of triple, tot 60 mm dik'], ['Kleuren', 'Volledige RAL-reeks, structuur of mat'], ['Onderhoud', 'Alleen schoonmaken, coating blijft kleurvast'], ['Garantie', '[X] jaar op product, [X] jaar op montage']]),
    vw: ['Zeer slanke profielen, maximaal glas', 'Grote schuifpuien tot [X] meter breed', 'Elke RAL-kleur, ook twee kleuren', 'Vormvast bij grote afmetingen'],
    faq: faq([['Is aluminium koud?', 'Nee. De profielen zijn thermisch onderbroken: een kunststof strip scheidt de binnen- en buitenzijde, zodat er geen koude doorslaat.'], ['Kan ik een bestaande pui vervangen door een schuifpui?', 'Meestal wel. Onze specialist beoordeelt of de opening en de draagconstructie dat toelaten.'], ['Hoe zwaar loopt zo’n schuifdeur?', 'Met een goed rollagerprofiel schuift ook een groot deurblad met één hand open.'], ['Wat kost aluminium ten opzichte van kunststof?', 'Aluminium ligt hoger in prijs. Bij grote glasvlakken is het vaak de enige optie die constructief werkt.']]),
  },
  {
    slug: 'houten-kozijnen', path: '/houten-kozijnen', nr: '03', naam: 'Houten kozijnen',
    lede: 'Karakter, authenticiteit en hoogwaardige uitstraling.',
    intro: 'Bij jaren-dertig woningen, monumenten en panden in beschermd stadsgezicht is hout vaak de enige juiste keuze — en soms ook verplicht. Wij werken met duurzaam gecertificeerd hout, fabrieksmatig voorbehandeld en afgelakt.',
    specs: spec([['Houtsoort', 'Meranti, accoya of eiken, FSC-gecertificeerd'], ['Isolatie', 'Uf-waarde vanaf 1,4 W/m²K'], ['Beglazing', 'HR++ of monumentenglas'], ['Afwerking', 'Fabrieksmatig gegrond en tweemaal afgelakt'], ['Onderhoud', 'Controle elke [X] jaar, schilderwerk elke [X] jaar'], ['Garantie', '[X] jaar op product, [X] jaar op montage']]),
    vw: ['Historisch verantwoorde profielen en detaillering', 'Geschikt bij monumenten en beschermd stadsgezicht', 'Elke kleur in dekkend of transparant', 'Bij goed onderhoud tientallen jaren mee'],
    faq: faq([['Hoeveel onderhoud vraagt hout?', 'Een controle elke paar jaar en op tijd bijwerken. Met accoya en een fabrieksmatige aflak lopen de intervallen flink op.'], ['Mag ik in een monument zelf kiezen?', 'Niet altijd. Gemeenten stellen eisen aan profiel, glas en kleur. We kennen die eisen en leveren de tekeningen voor uw aanvraag.'], ['Kan ik hout combineren met kunststof?', 'Ja. Aan de straatzijde hout voor de uitstraling, aan de achterzijde kunststof voor het onderhoud is een gangbare keuze.'], ['Is monumentenglas mogelijk?', 'Ja, isolerend glas met een dun profiel en licht onregelmatig oppervlak, zodat het beeld authentiek blijft.']]),
  },
];

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
