import { PlayerScore } from '../utils/scoring';

interface Props {
  ranked: PlayerScore[];
}

export function Leaderboard({ ranked }: Props) {
  const top10 = ranked.slice(0, 10);

  return (
    <div className="border-2 border-cm-border">
      {/* Panel header */}
      <div className="bg-cm-border px-3 py-1 flex items-center justify-between">
        <span className="text-cm-yellow font-bold text-sm uppercase tracking-widest">Top 10 Players of All Time</span>
        <span className="text-cm-cyan text-xs">Ranked by PFA award points</span>
      </div>

      {/* Column headings */}
      <div className="grid grid-cols-[2rem_1.5rem_1fr_0.8fr_5rem_4rem] bg-cm-panel border-b border-cm-border px-2 py-1 text-xs text-white/50 uppercase">
        <span>Pos</span>
        <span></span>
        <span>Player</span>
        <span>Club(s)</span>
        <span className="text-center">Awards</span>
        <span className="text-right">Pts</span>
      </div>

      {top10.map((ps, i) => (
        <div
          key={ps.player.id}
          className={`grid grid-cols-[2rem_1.5rem_1fr_0.8fr_5rem_4rem] px-2 py-1 text-sm border-b border-cm-border items-center ${
            i % 2 === 0 ? 'bg-cm-panel' : 'bg-cm-bg'
          } hover:bg-cm-border transition-none`}
        >
          {/* Rank */}
          <span className="text-white/40 text-xs">{i + 1}</span>

          {/* Position badge */}
          <span className="text-xs text-white/40">{ps.player.position}</span>

          {/* Name */}
          <span className="text-cm-cyan font-bold truncate pr-2">{ps.player.name}</span>

          {/* Clubs */}
          <span className="text-white/70 text-xs truncate pr-2">{ps.player.clubs[0]}</span>

          {/* Breakdown */}
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

          {/* Score */}
          <span className="text-cm-yellow font-bold text-right">{ps.score}</span>
        </div>
      ))}

      {/* Key */}
      <div className="bg-cm-panel border-t border-cm-border px-3 py-1.5 flex gap-6 text-xs text-white/40">
        <span><span className="text-cm-yellow font-bold">P</span> = Player of Year (4pts)</span>
        <span><span className="text-white/60 font-bold">T</span> = Team of Year (2pts, excl. if P same season)</span>
        <span><span className="text-white/40 font-bold">Y</span> = Young Player of Year (1pt)</span>
        <span className="ml-auto">Tiebreaker: PL appearances</span>
      </div>
    </div>
  );
}
