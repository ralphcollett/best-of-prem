import { Award } from '../data/awards';
import { Player } from '../data/players';

interface Props {
  awards: Award[];
  players: Player[];
}

const POSITION_ORDER = ['GK', 'RB', 'CB', 'LB', 'CDM', 'CM', 'CAM', 'RW', 'LW', 'ST'];

function positionGroup(position: string): string {
  if (position === 'GK') return 'GK';
  if (['RB', 'CB', 'LB'].includes(position)) return 'DF';
  if (['CM', 'CDM', 'CAM', 'RW', 'LW'].includes(position)) return 'MF';
  return 'FW';
}

function positionSortOrder(position: string): number {
  return POSITION_ORDER.indexOf(position) >= 0 ? POSITION_ORDER.indexOf(position) : 99;
}

export function YearsPage({ awards, players }: Props) {
  const playerById = Object.fromEntries(players.map(p => [p.id, p]));

  const seasons = [...new Set(awards.map(a => a.season))].sort().reverse();

  return (
    <div className="space-y-4">
      {seasons.map(season => {
        const seasonAwards = awards.filter(a => a.season === season);
        const poty = seasonAwards.find(a => a.type === 'POTY');
        const ypoty = seasonAwards.find(a => a.type === 'YPOTY');
        const toty = seasonAwards
          .filter(a => a.type === 'TOTY')
          .sort((a, b) => {
            const pa = playerById[a.playerId];
            const pb = playerById[b.playerId];
            return positionSortOrder(pa?.position ?? '') - positionSortOrder(pb?.position ?? '');
          });

        const potyPlayer = poty ? playerById[poty.playerId] : null;
        const ypotyPlayer = ypoty ? playerById[ypoty.playerId] : null;

        // Format season display: "1992-93" → "1992–93"
        const seasonDisplay = season.replace('-', '–');

        return (
          <div key={season} className="border-2 border-cm-border overflow-hidden">
            {/* Season header */}
            <div className="bg-cm-red border-b border-yellow-600 px-3 py-1">
              <span className="text-cm-yellow font-bold text-sm uppercase tracking-widest">
                {seasonDisplay}
              </span>
            </div>

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

              {/* TOTY */}
              {toty.length > 0 && (
                <div className="bg-cm-bg border border-cm-border overflow-hidden">
                  <div className="bg-cm-border px-3 py-0.5">
                    <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Team of the Year</span>
                  </div>
                  <div className="divide-y divide-cm-border">
                    {toty.map(a => {
                      const p = playerById[a.playerId];
                      if (!p) return null;
                      const group = positionGroup(p.position);
                      return (
                        <div key={a.playerId} className="flex items-center gap-2 px-3 py-1">
                          <span className="text-white/30 text-xs w-6 shrink-0">{group}</span>
                          <span className="text-xs text-white/40 w-8 shrink-0">{p.position}</span>
                          <span className="text-white/90 text-sm flex-1">{p.name}</span>
                          <span className="text-white/40 text-xs">{a.club}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
