import producten from '@/data/catalogus.json';
import deurenData from '@/data/deuren.json';

export type Block = { t: 'p' | 'h'; x: string } | { t: 'ul'; x: string[] };
export type Image = { src: string; w: number; h: number };
export type Product = {
  cat: CatKey; sub: string | null; slug: string; title: string; tags: string[];
  bullets: string[]; numbers: { n: string; l: string }[]; desc: Block[];
  colors: { name: string; img: string }[]; pdfs: { t: string; u: string }[]; image: Image;
};
export type DeurCollectie = {
  slug: string; title: string; bullets: string[]; desc: Block[]; pdfs: { t: string; u: string }[]; image: Image;
  variants: { name: string | null; slug: string; models: { code: string; img: string }[] }[];
};
export type CatKey = 'pvc-ramen' | 'pvc-deuren' | 'pvc-schuifsystemen' | 'horren';

export const PRODUCTS = producten as unknown as Product[];
export const DEUREN = deurenData as unknown as DeurCollectie[];

export const CATEGORIES: Record<CatKey, {
  path: string; naam: string; kort: string; h1: string; intro: string; metaDescription: string;
}> = {
  'pvc-ramen': {
    path: '/pvc-ramen', naam: 'PVC ramen', kort: 'PVC ramen',
    h1: 'PVC ramen', intro: 'Kunststof ramen die warm, stil en onderhoudsarm zijn. Wij leveren en plaatsen de Ideal 7000 NL: een KOMO-gecertificeerd profiel dat speciaal voor de Nederlandse markt is ontwikkeld.',
    metaDescription: 'PVC ramen van Dukora: de Ideal 7000 NL, KOMO-gecertificeerd en RC2-inbraakwerend. Eigen montageteams, vrijblijvende offerte, heel Nederland.',
  },
  'pvc-deuren': {
    path: '/pvc-deuren', naam: 'PVC deuren', kort: 'PVC deuren',
    h1: 'PVC deuren', intro: 'Buitendeuren van PVC in zes collecties, met samen honderden panelen en uitvoeringen. Kies een collectie en bekijk alle modellen.',
    metaDescription: 'PVC buitendeuren van Dukora: EkoLine, EkoVitre, ClassicLine, EkoGreen, modeldeuren en overdekkende panelen. Bekijk alle modellen en vraag een vrijblijvende offerte aan.',
  },
  'pvc-schuifsystemen': {
    path: '/pvc-schuifsystemen', naam: 'PVC schuifsystemen', kort: 'PVC schuifsystemen',
    h1: 'PVC schuifsystemen', intro: 'Schuifpuien en hefschuifsystemen van PVC: veel daglicht, een soepele bediening en uitstekende isolatie. Vijftien systemen voor elke woning.',
    metaDescription: 'PVC schuifsystemen van Dukora: hefschuifpuien, harmonicasystemen en schuifdeuren. Vergelijk vijftien systemen en vraag een vrijblijvende offerte aan.',
  },
  horren: {
    path: '/horren', naam: 'Horren', kort: 'Horren',
    h1: 'Horren', intro: 'Insectenwering voor ramen en deuren: vaste horren, uitschuifbare horren en deurklamboes. Zo blijven muggen en vliegen buiten en de ramen open.',
    metaDescription: 'Horren van Dukora: raamhorren, uitschuifbare horren en muggengaas voor deuren. Bekijk het assortiment en vraag een vrijblijvende offerte aan.',
  },
};

export const HORREN_GROEPEN: { sub: string; naam: string }[] = [
  { sub: 'horren', naam: 'Horren voor ramen' },
  { sub: 'muggengaas-voor-deuren', naam: 'Muggengaas voor deuren' },
  { sub: 'uitschuifbare-horren', naam: 'Uitschuifbare horren' },
];

export const productsIn = (cat: CatKey) => PRODUCTS.filter((p) => p.cat === cat);
export const productBySlug = (cat: CatKey, slug: string) => PRODUCTS.find((p) => p.cat === cat && p.slug === slug);
export const collectieBySlug = (slug: string) => DEUREN.find((c) => c.slug === slug);
/** Aantal unieke modellen; dezelfde code in meerdere varianten telt één keer. */
export const modelCount = (c: DeurCollectie) => new Set(c.variants.flatMap((v) => v.models.map((m) => m.code))).size;

/** De bron noemt de buitendeurcatalogus ten onrechte "Binnendeuren catalogus". */
export const pdfLabel = (t: string) => t.replace(/^Binnendeuren catalogus/i, 'Catalogus buitendeuren');

/** Eerste zin van de eerste alinea; te lang → op een woordgrens afgekapt. */
export const firstSentence = (blocks: Block[], max = 170) => {
  const p = blocks.find((b) => b.t === 'p');
  if (!p || p.t !== 'p') return '';
  const m = p.x.match(/^(.+?[.!?])(\s|$)/);
  const t = m ? m[1] : p.x;
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 60)).replace(/[,.;:]$/, '') + '…';
};
