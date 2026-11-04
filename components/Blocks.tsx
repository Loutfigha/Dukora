import type { Block } from '@/lib/catalogus';

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.t === 'ul') {
          return (
            <ul key={i} className="m-0 list-none space-y-3 p-0">
              {b.x.map((li) => (
                <li key={li} className="flex gap-4 text-[17px] leading-[1.55] text-text-3"><span aria-hidden className="mt-[10px] h-[7px] w-[7px] flex-none bg-dennen" />{li}</li>
              ))}
            </ul>
          );
        }
        return b.t === 'h'
          ? <h3 key={i} className="t-sub pt-4 !text-[24px]">{b.x}</h3>
          : <p key={i} className="body-l">{b.x}</p>;
      })}
    </div>
  );
}
