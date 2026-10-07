import { NextResponse } from 'next/server';

export const bad = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });
export const ok = () => NextResponse.json({ ok: true });

const hits = new Map<string, number[]>();
/** Eenvoudige in-memory rate limit (per instance). Vervang door Upstash/Turnstile bij schaal. */
export function limited(ip: string, max = 5, windowMs = 60_000) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > max;
}
