import type { Block } from '@/lib/catalogus';

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        if (b.t === 'ul') {
          return (
            <ul key={i} className="m-0 list-none border-t border-line p-0">
              {b.x.map((li) => (
                <li key={li} className="flex gap-[14px] border-b border-line py-[14px] text-[16px] leading-[1.5] text-text-2"><span aria-hidden className="font-bold text-accent">✓</span>{li}</li>
              ))}
            </ul>
          );
        }
        return b.t === 'h'
          ? <h3 key={i} className="pt-2 text-[19px] font-semibold tracking-[-.02em]">{b.x}</h3>
          : <p key={i} className="body-l">{b.x}</p>;
      })}
    </div>
  );
}
