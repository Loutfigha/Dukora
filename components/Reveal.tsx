'use client';
import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

/** Scroll-reveal. Zonder JS (of bij reduced-motion) is de content gewoon zichtbaar. */
export default function Reveal({ as: Tag = 'div', className = '', children }: { as?: ElementType; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.94) return;
    el.classList.add('rv-hidden');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.remove('rv-hidden');
          el.classList.add('rv-in');
          io.unobserve(el);
        }
      }),
      { rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
