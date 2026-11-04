import type { ElementType, ReactNode } from 'react';

/** Geen scrolleffect meer: beweging is beperkt tot de hero bij het laden. Blijft bestaan zodat bestaande plekken blijven werken. */
export default function Reveal({ as: Tag = 'div', className = '', children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={className}>{children}</Tag>;
}
