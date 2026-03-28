import { Formation, PITCH_LAYOUTS, XISlot } from '../utils/bestXI';
import { PlayerScore } from '../utils/scoring';

interface Props {
  xi: XISlot[];
  formation: Formation;
  onFormationChange: (f: Formation) => void;
}

const FORMATIONS: Formation[] = ['4-3-3', '4-4-2', '5-3-2'];

function PlayerTile({ ps, slot }: { ps: PlayerScore; slot: string }) {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <div className="w-14 h-14 rounded-full bg-pl-purple border-2 border-pl-green flex items-center justify-center text-xs font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
        {slot}
      </div>
      <span className="text-white text-xs font-semibold text-center leading-tight w-20 truncate">
        {ps.player.name.split(' ').pop()}
      </span>
      <span className="text-pl-green text-xs font-black">{ps.score}pts</span>
    </div>
  );
}

export function BestXI({ xi, formation, onFormationChange }: Props) {
  const layout = PITCH_LAYOUTS[formation];
  const bySlot = Object.fromEntries(xi.map(s => [s.slot, s]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-pl-green">Best Starting XI</h2>
        {/* Formation picker */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          {FORMATIONS.map(f => (
            <button
              key={f}
              onClick={() => onFormationChange(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                formation === f
                  ? 'bg-pl-green text-pl-purple shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Pitch */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10">
        <div
          className="w-full"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 60px), linear-gradient(180deg, #1a4a2a 0%, #1e5530 50%, #1a4a2a 100%)',
            minHeight: '420px',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 rounded-full border border-white/10" />
          </div>
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />

          <div className="relative z-10 flex flex-col justify-around py-8 px-4 h-full min-h-[420px]">
            {layout.map((row, r) => (
              <div key={r} className="flex justify-around items-center">
                {row.map(slotName => {
                  const entry = bySlot[slotName];
                  return (
                    <div key={slotName} className="w-20 flex justify-center">
                      {entry?.playerScore ? (
                        <PlayerTile ps={entry.playerScore} slot={slotName} />
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-white/20 text-xs">
                            {slotName}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* XI list */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {xi.filter(s => s.playerScore).map(({ slot, playerScore: ps }) => (
          <div key={slot} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
            <span className="text-white/40 text-xs w-10 shrink-0">{slot}</span>
            <span className="text-white text-sm font-semibold truncate">{ps!.player.name}</span>
            <span className="ml-auto text-pl-green text-xs font-bold shrink-0">{ps!.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
