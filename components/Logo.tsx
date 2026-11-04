/** Woordmerk met een klein raamteken: een kozijn met kruisverdeling. */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[10px] ${className}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <rect x="1" y="1" width="20" height="20" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 1v20M1 11h20" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span className="font-display text-[27px] font-medium leading-none tracking-[-.02em]">Dukora</span>
    </span>
  );
}
