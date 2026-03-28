import { useEffect, useRef, useState } from 'react';
import { PlayerScore } from '../utils/scoring';
import { Award } from '../data/awards';

interface Props {
  ranked: PlayerScore[];
  awards: Award[];
}

const PAGE_SIZE = 20;

export function Leaderboard({ ranked, awards }: Props) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(v => Math.min(v + PAGE_SIZE, ranked.length));
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [ranked.length]);

  const rows = ranked.slice(0, visible);
  const hasMore = visible < ranked.length;

  // Helper to determine rank with ties
  const getRankDisplay = (index: number) => {
    if (index === 0) return '1';
    const current = ranked[index];
    const prev = ranked[index - 1];

    const isTied =
      current.score === prev.score &&
      current.breakdown.potyCount === prev.breakdown.potyCount &&
      current.breakdown.ypotyCount === prev.breakdown.ypotyCount;

    if (isTied) {
      // Find the first index of this tied group
      let firstIdx = index - 1;
      while (firstIdx > 0) {
        const p = ranked[firstIdx - 1];
        if (p.score === current.score &&
            p.breakdown.potyCount === current.breakdown.potyCount &&
            p.breakdown.ypotyCount === current.breakdown.ypotyCount) {
          firstIdx--;
        } else {
          break;
        }
      }
      return `=${firstIdx + 1}`;
    }
    return (index + 1).toString();
  };

  // Derive unique clubs per player from their awards
  const getPlayerClubs = (playerId: string): string => {
    const clubs = [...new Set(awards.filter(a => a.playerId === playerId).map(a => a.club))];
    return clubs.join(', ');
  };

  return (
    <div className="border-2 border-cm-border overflow-hidden">
      {/* Panel header */}
      <div className="bg-cm-border px-3 py-1 flex items-center justify-between flex-wrap gap-1">
        <span className="text-cm-yellow font-bold text-sm uppercase tracking-widest">
          All-Time Rankings
        </span>
        <span className="text-cm-cyan text-xs">
          {ranked.length} players · ranked by PFA award points
        </span>
      </div>

      {/* Column headings */}
      <div className="grid grid-cols-[2.5rem_2rem_minmax(0,1fr)_minmax(0,0.8fr)_2.5rem_2.5rem_2.5rem_3rem] gap-x-2 bg-cm-panel border-b border-cm-border px-2 py-1 text-[10px] text-white/50 uppercase sticky top-0 z-10">
        <span>Pos</span>
        <span>Pos</span>
        <span className="min-w-0">Player</span>
        <span className="min-w-0">Award Club(s)*</span>
        <span className="text-center">POTY</span>
        <span className="text-center">YPOTY</span>
        <span className="text-center">TOTY</span>
        <span className="text-right">Pts</span>
      </div>

      {rows.map((ps, i) => (
        <div
          key={ps.player.id}
          className={`grid grid-cols-[2.5rem_2rem_minmax(0,1fr)_minmax(0,0.8fr)_2.5rem_2.5rem_2.5rem_3rem] gap-x-2 px-2 py-1 text-sm border-b border-cm-border items-center ${
            i % 2 === 0 ? 'bg-cm-panel' : 'bg-cm-bg'
          } hover:bg-cm-border transition-none`}
        >
          <span className="text-white/40 text-xs">{getRankDisplay(i)}</span>
          <span className="text-xs text-white/40">{ps.player.position}</span>
          <span className="text-cm-cyan font-bold truncate min-w-0 pr-2">{ps.player.name}</span>
          <span className="text-white/70 text-xs truncate min-w-0 pr-2">{getPlayerClubs(ps.player.id)}</span>

          <span className="text-center text-cm-yellow font-bold">{ps.breakdown.potyCount || '—'}</span>
          <span className="text-center text-white/40">{ps.breakdown.ypotyCount || '—'}</span>
          <span className="text-center text-white/60">{ps.breakdown.totyCount || '—'}</span>

          <span className="text-cm-yellow font-bold text-right">{ps.score}</span>
        </div>
      ))}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="py-1 text-center text-xs text-white/20">
        {hasMore ? 'Loading...' : `All ${ranked.length} players shown`}
      </div>

      {/* Key */}
      <div className="bg-cm-panel border-t border-cm-border px-3 py-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40">
        <span><span className="text-cm-yellow font-bold">POTY</span> = Player of Year (3pts)</span>
        <span><span className="text-white/60 font-bold">TOTY</span> = Team of Year (1pt)</span>
        <span><span className="text-white/40 font-bold">YPOTY</span> = Young Player of Year (1pt)</span>
        <span className="ml-auto">Tiebreaker: POTY count, then YPOTY count</span>
        <span className="w-full">* clubs shown are only where PFA awards were won</span>
      </div>
    </div>
  );
}
