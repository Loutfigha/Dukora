import Image from 'next/image';

type Props = {
  /** Pad onder /public, bv. "/img/hero.jpg". Zonder src tonen we een placeholder. */
  src?: string;
  alt?: string;
  placeholder: string;
  /** Tailwind aspect-klasse, bv. "aspect-[4/3]". Laat leeg als de ouder de hoogte bepaalt (fill). */
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Verberg de placeholdertekst (bv. onder tekst in de hero). */
  quiet?: boolean;
};

/** Foto of placeholder. Klant levert beeld aan: zet `src` en de placeholder verdwijnt. */
export default function Photo({ src, alt = '', placeholder, aspect = '', priority, sizes = '100vw', className = '', quiet }: Props) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#1A1D21]/[.07] ${aspect} ${aspect ? '' : 'h-full'} ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,rgba(16,18,21,.04)_0_14px,rgba(16,18,21,.07)_14px_28px)] p-6 text-center text-[13px] leading-snug text-text-5">
          {quiet ? null : placeholder}
        </div>
      )}
    </div>
  );
}
