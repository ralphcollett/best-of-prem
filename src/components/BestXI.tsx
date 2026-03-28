import { Formation, PITCH_LAYOUTS, XISlot } from '../utils/bestXI';
import { PlayerScore } from '../utils/scoring';
import { CMSelect } from './CMSelect';

interface Props {
  xi: XISlot[];
  formation: Formation;
  onFormationChange: (f: Formation) => void;
}

const FORMATION_OPTIONS: { value: Formation; label: string }[] = [
  { value: '4-3-3', label: '4-3-3' },
  { value: '4-4-2', label: '4-4-2' },
  { value: '5-3-2', label: '5-3-2' },
];

// Shirt number by rank in the XI list
function shirtNumber(xi: XISlot[], slot: string): number {
  const idx = xi.findIndex(s => s.slot === slot);
  return idx + 1;
}

function PlayerCircle({ ps, num }: { ps: PlayerScore; num: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="w-10 h-10 rounded-full bg-cm-red border-2 border-white flex items-center justify-center text-sm font-bold text-white shadow">
        {num}
      </div>
      <span className="text-cm-cyan text-xs font-bold text-center leading-tight w-16 truncate text-center">
        {ps.player.name.split(' ').pop()}
      </span>
      <span className="text-cm-yellow text-xs font-bold">{ps.score}pts</span>
    </div>
  );
}

function EmptyCircle({ slot }: { slot: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="w-10 h-10 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center text-white/20 text-xs">
        ?
      </div>
      <span className="text-white/20 text-xs">{slot}</span>
    </div>
  );
}

export function BestXI({ xi, formation, onFormationChange }: Props) {
  const layout = PITCH_LAYOUTS[formation];
  const bySlot = Object.fromEntries(xi.map(s => [s.slot, s]));

  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      {/* Left: player list */}
      <div className="border-2 border-cm-border flex-shrink-0 w-full lg:w-72">
        {/* Formation picker */}
        <div className="bg-cm-border px-3 py-1.5 flex items-center gap-3">
          <CMSelect
            label="Formation"
            value={formation}
            options={FORMATION_OPTIONS}
            onChange={onFormationChange}
          />
        </div>

        {/* Player rows */}
        {xi.map(({ slot, playerScore: ps }, i) => (
          <div
            key={slot}
            className={`grid grid-cols-[1.5rem_2rem_1fr_2rem] px-2 py-1 text-sm border-b border-cm-border items-center ${
              i % 2 === 0 ? 'bg-cm-panel' : 'bg-cm-bg'
            }`}
          >
            <span className="text-white/40 text-xs">{i + 1}</span>
            <span className="text-white/40 text-xs">{slot}</span>
            <span className={`font-bold truncate ${ps ? 'text-cm-cyan' : 'text-white/20'}`}>
              {ps ? ps.player.name : '—'}
            </span>
            <span className="text-cm-yellow text-xs font-bold text-right">
              {ps ? ps.score : ''}
            </span>
          </div>
        ))}
      </div>

      {/* Right: pitch */}
      <div className="border-2 border-cm-border flex-1">
        <div className="bg-cm-border px-3 py-1">
          <span className="text-cm-yellow font-bold text-sm uppercase tracking-widest">Pitch View — {formation}</span>
        </div>

        {/* Pitch */}
        <div
          className="relative w-full"
          style={{
            background: '#007a00',
            minHeight: '420px',
          }}
        >
          {/* Pitch markings */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Outline */}
            <div className="absolute inset-3 border border-white/40" />
            {/* Centre line */}
            <div className="absolute left-3 right-3 top-1/2 h-px bg-white/40" />
            {/* Centre circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-white/40" />
            </div>
            {/* Penalty areas */}
            <div className="absolute left-1/4 right-1/4 top-3 h-14 border border-white/30" />
            <div className="absolute left-1/4 right-1/4 bottom-3 h-14 border border-white/30" />
          </div>

          {/* Players */}
          <div className="relative z-10 flex flex-col justify-around py-6 px-2 min-h-[420px]">
            {layout.map((row, r) => (
              <div key={r} className="flex justify-around items-center">
                {row.map(slotName => {
                  const entry = bySlot[slotName];
                  const num = shirtNumber(xi, slotName);
                  return (
                    <div key={slotName} className="flex justify-center w-20">
                      {entry?.playerScore
                        ? <PlayerCircle ps={entry.playerScore} num={num} />
                        : <EmptyCircle slot={slotName} />
                      }
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
