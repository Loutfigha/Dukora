type DL = Record<string, unknown>;

export function push(event: DL) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: DL[] };
  (w.dataLayer = w.dataLayer || []).push(event);
}

export const trackCta = (cta: string) => push({ event: 'cta_click', cta });
