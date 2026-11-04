import { IconCheck } from './Icons';

const PUNTEN = ['Eigen montageteams', 'Persoonlijk advies', 'Vrijblijvende offerte', 'Heel Nederland'];

/** Korte vertrouwenspunten onder de header. Alleen dingen die Dukora waar kan maken. */
export default function TrustBar() {
  return (
    <div className="border-b border-lijn bg-white">
      <ul className="wrap my-0 flex list-none flex-wrap justify-center gap-x-10 gap-y-1 py-3 text-[14.5px] text-text-3 nav:justify-between">
        {PUNTEN.map((p) => (
          <li key={p} className="flex items-center gap-2"><span className="text-dennen"><IconCheck /></span>{p}</li>
        ))}
      </ul>
    </div>
  );
}
