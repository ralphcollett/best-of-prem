import { PlayerScore } from '../utils/scoring';

interface Props {
  ranked: PlayerScore[];
}

export function Leaderboard({ ranked }: Props) {
  const top10 = ranked.slice(0, 10);

  return (
    <div className="border-2 border-cm-border overflow-hidden">
      {/* Panel header */}
      <div className="bg-cm-border px-3 py-1 flex items-center justify-between flex-wrap gap-1">
        <span className="text-cm-yellow font-bold text-sm uppercase tracking-widest">Top 10 Players of All Time</span>
        <span className="text-cm-cyan text-xs">Ranked by PFA award points</span>
      </div>

      {/* Column headings */}
      <div className="grid grid-cols-[2rem_1.5rem_minmax(0,1fr)_minmax(0,0.8fr)_5rem_4rem] bg-cm-panel border-b border-cm-border px-2 py-1 text-xs text-white/50 uppercase">
        <span>Pos</span>
        <span></span>
        <span className="min-w-0">Player</span>
        <span className="min-w-0">Club(s)</span>
        <span className="text-center">Awards</span>
        <span className="text-right">Pts</span>
      </div>

      {top10.map((ps, i) => (
        <div
          key={ps.player.id}
          className={`grid grid-cols-[2rem_1.5rem_minmax(0,1fr)_minmax(0,0.8fr)_5rem_4rem] px-2 py-1 text-sm border-b border-cm-border items-center ${
            i % 2 === 0 ? 'bg-cm-panel' : 'bg-cm-bg'
          } hover:bg-cm-border transition-none`}
        >
          <span className="text-white/40 text-xs">{i + 1}</span>
          <span className="text-xs text-white/40">{ps.player.position}</span>
          <span className="text-cm-cyan font-bold truncate min-w-0 pr-2">{ps.player.name}</span>
          <span className="text-white/70 text-xs truncate min-w-0 pr-2">{ps.player.clubs[0]}</span>
          <div className="flex gap-1.5 text-xs justify-center">
            {ps.breakdown.potyCount > 0 && (
              <span className="text-cm-yellow font-bold">{ps.breakdown.potyCount}P</span>
            )}
            {ps.breakdown.totyCount > 0 && (
              <span className="text-white/60">{ps.breakdown.totyCount}T</span>
            )}
            {ps.breakdown.ypotyCount > 0 && (
              <span className="text-white/40">{ps.breakdown.ypotyCount}Y</span>
            )}
          </div>
          <span className="text-cm-yellow font-bold text-right">{ps.score}</span>
        </div>
      ))}

      {/* Key */}
      <div className="bg-cm-panel border-t border-cm-border px-3 py-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40">
        <span><span className="text-cm-yellow font-bold">P</span> = Player of Year (4pts)</span>
        <span><span className="text-white/60 font-bold">T</span> = Team of Year (2pts, excl. if P same season)</span>
        <span><span className="text-white/40 font-bold">Y</span> = Young Player of Year (1pt)</span>
        <span className="ml-auto">Tiebreaker: PL appearances</span>
      </div>
    </div>
  );
}
