import { IconTeam, IconAdvies, IconPlanning, IconGarantie } from './Icons';

export const VOORDELEN = [
  { icon: <IconTeam />, t: 'Eigen montageteams', s: 'Geen onderaannemers. Dezelfde mensen meten in, plaatsen en leveren op.' },
  { icon: <IconAdvies />, t: 'Persoonlijk advies', s: 'Onze specialist komt bij u thuis, meet alles in en geeft eerlijk advies. Zonder verkooppraatje.' },
  { icon: <IconPlanning />, t: 'Een planning die klopt', s: 'Productie en montage liggen bij één partij, dus u weet wie er komt en wanneer.' },
  { icon: <IconGarantie />, t: 'Garantie op papier', s: 'Bij de oplevering lopen we alles samen na en laten we de garantie achter.' },
];

/** Vier voordelen met icoon, op een witte band. Gedeeld door homepage en overzichtspagina's. */
export default function Voordelen({ border = true }: { border?: boolean }) {
  return (
    <section className={`bg-white ${border ? 'border-y border-lijn' : ''}`}>
      <div className="wrap">
        <ul className="m-0 grid list-none gap-x-10 gap-y-10 p-0 py-[clamp(48px,6vw,88px)] sm:grid-cols-2 nav:grid-cols-4">
          {VOORDELEN.map((v) => (
            <li key={v.t}>
              <span className="flex h-14 w-14 items-center justify-center border border-dennen/25 text-dennen">{v.icon}</span>
              <h2 className="t-sub mt-6 !text-[24px]">{v.t}</h2>
              <p className="mt-3 text-[16px] leading-[1.6] text-steen">{v.s}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
