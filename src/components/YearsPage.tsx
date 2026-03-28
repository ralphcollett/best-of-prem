import { useState } from 'react';
import { Award } from '../data/awards';
import { Player } from '../data/players';

interface Props {
  awards: Award[];
  players: Player[];
}

function surname(name: string): string {
  return name.includes(' ') ? name.split(' ').slice(1).join(' ') : name;
}

function positionGroup(position: string): 'GK' | 'DF' | 'MF' | 'FW' {
  if (position === 'GK') return 'GK';
  if (['RB', 'CB', 'LB'].includes(position)) return 'DF';
  if (['CM', 'CDM', 'CAM', 'RW', 'LW'].includes(position)) return 'MF';
  return 'FW';
}

function PitchPlayer({ name, club }: { name: string; club: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="w-10 h-10 rounded-full bg-cm-red border-2 border-white flex items-center justify-center shadow" />
      <span className="text-cm-cyan text-xs font-bold text-center leading-tight w-20">
        {surname(name)}
      </span>
      <span className="text-white/50 text-[10px] text-center leading-tight w-20">{club}</span>
    </div>
  );
}

function TotyPitch({ toty, playerById }: { toty: Award[]; playerById: Record<string, Player> }) {
  const byGroup: Record<string, Array<{ award: Award; player: Player }>> = {
    GK: [], DF: [], MF: [], FW: [],
  };

  for (const a of toty) {
    const p = playerById[a.playerId];
    if (!p) continue;
    byGroup[positionGroup(p.position)].push({ award: a, player: p });
  }

  const rows = [
    byGroup.FW,
    byGroup.MF,
    byGroup.DF,
    byGroup.GK,
  ].filter(r => r.length > 0);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: '#007a00', minHeight: '600px' }}
    >
      {/* Pitch markings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-3 border border-white/40" />
        <div className="absolute left-3 right-3 top-1/2 h-px bg-white/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border border-white/40" />
        </div>
        <div className="absolute left-1/4 right-1/4 top-3 h-14 border border-white/30" />
        <div className="absolute left-1/4 right-1/4 bottom-3 h-14 border border-white/30" />
      </div>

      {/* Players */}
      <div className="relative z-10 flex flex-col justify-around py-6 px-2 min-h-[600px]">
        {rows.map((entries, i) => (
          <div key={i} className="flex justify-around items-start">
            {entries.map(({ award, player }) => (
              <div key={player.id} className="flex justify-center" style={{ width: `${100 / entries.length}%` }}>
                <PitchPlayer name={player.name} club={award.club} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function YearsPage({ awards, players }: Props) {
  const playerById = Object.fromEntries(players.map(p => [p.id, p]));
  const seasons = [...new Set(awards.map(a => a.season))].sort().reverse();

  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(seasons.slice(0, 1))
  );

  function toggle(season: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(season)) next.delete(season);
      else next.add(season);
      return next;
    });
  }

  return (
    <div className="space-y-2">
      {seasons.map(season => {
        const isOpen = expanded.has(season);
        const seasonAwards = awards.filter(a => a.season === season);
        const poty = seasonAwards.find(a => a.type === 'POTY');
        const ypoty = seasonAwards.find(a => a.type === 'YPOTY');
        const toty = seasonAwards.filter(a => a.type === 'TOTY');

        const potyPlayer = poty ? playerById[poty.playerId] : null;
        const ypotyPlayer = ypoty ? playerById[ypoty.playerId] : null;

        const seasonDisplay = season.replace('-', '–');

        return (
          <div key={season} className="border-2 border-cm-border overflow-hidden">
            {/* Clickable season header */}
            <button
              onClick={() => toggle(season)}
              className="w-full bg-cm-red border-b border-yellow-600 px-3 py-1.5 flex items-center justify-between hover:brightness-110 transition-none"
            >
              <span className="text-cm-yellow font-bold text-sm uppercase tracking-widest">
                {seasonDisplay}
              </span>
              <span className="text-cm-yellow text-xs opacity-70">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
              <div className="bg-cm-panel p-3 space-y-3">
                {/* POTY */}
                {poty && potyPlayer && (
                  <div className="flex items-center gap-3 bg-cm-bg border border-yellow-600/40 px-3 py-2">
                    <span className="text-yellow-500 font-bold text-xs uppercase tracking-widest w-28 shrink-0">
                      Player of Year
                    </span>
                    <span className="text-cm-yellow font-bold">{potyPlayer.name}</span>
                    <span className="text-white/50 text-xs ml-auto">{poty.club}</span>
                  </div>
                )}

                {/* YPOTY */}
                {ypoty && ypotyPlayer && (
                  <div className="flex items-center gap-3 bg-cm-bg border border-cm-border px-3 py-2">
                    <span className="text-white/60 font-bold text-xs uppercase tracking-widest w-28 shrink-0">
                      Young Player
                    </span>
                    <span className="text-cm-cyan font-bold">{ypotyPlayer.name}</span>
                    <span className="text-white/50 text-xs ml-auto">{ypoty.club}</span>
                  </div>
                )}

                {/* TOTY pitch */}
                {toty.length > 0 && (
                  <div className="border border-cm-border overflow-hidden">
                    <div className="bg-cm-border px-3 py-0.5">
                      <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Team of the Year</span>
                    </div>
                    <TotyPitch toty={toty} playerById={playerById} />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
