import { PlayerScore } from '../utils/scoring';

interface Props {
  ranked: PlayerScore[];
}

const POSITION_COLOURS: Record<string, string> = {
  GK:  'bg-yellow-400 text-yellow-900',
  RB:  'bg-blue-400 text-blue-900',
  CB:  'bg-blue-600 text-white',
  LB:  'bg-blue-400 text-blue-900',
  CDM: 'bg-green-600 text-white',
  CM:  'bg-green-500 text-white',
  CAM: 'bg-green-400 text-green-900',
  RW:  'bg-purple-500 text-white',
  LW:  'bg-purple-500 text-white',
  ST:  'bg-red-500 text-white',
  SS:  'bg-red-400 text-white',
};

const MEDAL: Record<number, string> = { 0: '🥇', 1: '🥈', 2: '🥉' };

export function Leaderboard({ ranked }: Props) {
  const top10 = ranked.slice(0, 10);

  return (
    <div>
      <h2 className="text-2xl font-bold text-pl-green mb-6">Top 10 Players</h2>
      <div className="space-y-3">
        {top10.map((ps, i) => (
          <div
            key={ps.player.id}
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-5 py-4 border border-white/10"
          >
            {/* Rank */}
            <div className="w-8 text-center text-xl font-bold text-white/60 shrink-0">
              {MEDAL[i] ?? <span className="text-base">{i + 1}</span>}
            </div>

            {/* Name + clubs */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-lg leading-tight truncate">{ps.player.name}</p>
              <p className="text-white/50 text-sm truncate">{ps.player.clubs.join(' · ')}</p>
            </div>

            {/* Position badge */}
            <span
              className={`hidden sm:inline-block text-xs font-bold px-2 py-0.5 rounded shrink-0 ${POSITION_COLOURS[ps.player.position] ?? 'bg-gray-600 text-white'}`}
            >
              {ps.player.position}
            </span>

            {/* Breakdown */}
            <div className="hidden md:flex gap-3 text-xs text-white/50 shrink-0">
              {ps.breakdown.potyCount > 0 && (
                <span title="Player of the Year">
                  <span className="text-pl-green font-semibold">{ps.breakdown.potyCount}</span> POTY
                </span>
              )}
              {ps.breakdown.totyCount > 0 && (
                <span title="Team of the Year">
                  <span className="text-pl-green font-semibold">{ps.breakdown.totyCount}</span> TOTY
                </span>
              )}
              {ps.breakdown.ypotyCount > 0 && (
                <span title="Young Player of the Year">
                  <span className="text-pl-green font-semibold">{ps.breakdown.ypotyCount}</span> YPOTY
                </span>
              )}
            </div>

            {/* Score */}
            <div className="shrink-0 text-right">
              <span className="text-2xl font-black text-pl-green">{ps.score}</span>
              <span className="text-white/40 text-xs ml-1">pts</span>
            </div>
          </div>
        ))}
      </div>

      {/* Points key */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/40">
        <span><span className="text-pl-green font-bold">4 pts</span> — Player of the Year</span>
        <span><span className="text-pl-green font-bold">2 pts</span> — Team of the Year (excl. if POTY same season)</span>
        <span><span className="text-pl-green font-bold">1 pt</span> — Young Player of the Year</span>
        <span>Tiebreaker: PL appearances</span>
      </div>
    </div>
  );
}
