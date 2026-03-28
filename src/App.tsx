import { useMemo, useState } from 'react';
import { players } from './data/players';
import { awards } from './data/awards';
import { wslPlayers } from './data/wsl-players';
import { wslAwards } from './data/wsl-awards';
import { getRankedPlayers } from './utils/scoring';
import { selectBestXI, selectSubs } from './utils/bestXI';
import { Leaderboard } from './components/Leaderboard';
import { BestXI } from './components/BestXI';
import { YearsPage } from './components/YearsPage';

type Tab = 'leaderboard' | 'xi' | 'years';
type League = 'pl' | 'wsl';

export default function App() {
  const [tab, setTab] = useState<Tab>('leaderboard');
  const [league, setLeague] = useState<League>('pl');

  const activePlayers = league === 'pl' ? players : wslPlayers;
  const activeAwards  = league === 'pl' ? awards  : wslAwards;

  const ranked = useMemo(() => getRankedPlayers(activePlayers, activeAwards), [activePlayers, activeAwards]);
  const xi = useMemo(() => selectBestXI(ranked), [ranked]);
  const subs = useMemo(() => {
    const usedIds = new Set(xi.map(s => s.playerScore?.player.id).filter(Boolean) as string[]);
    return selectSubs(ranked, usedIds);
  }, [ranked, xi]);

  return (
    <div className="min-h-screen bg-cm-bg font-mono text-white">
      {/* Title bar */}
      <div className="bg-cm-red border-b-2 border-yellow-600 px-4 py-2">
        <h1 className="text-cm-yellow font-bold text-lg uppercase tracking-wide text-center">
          {league === 'pl' ? 'Premier League' : 'Women\'s Super League'} All-Time Select
        </h1>
      </div>

      {/* League selector */}
      <div className="bg-cm-red border-b-2 border-yellow-600 flex justify-center py-2">
        <div className="relative">
          <select
            value={league}
            onChange={e => setLeague(e.target.value as League)}
            className="bg-neutral-600 text-white font-mono font-bold text-sm uppercase tracking-widest border-2 border-neutral-400 px-3 py-1 pr-8 cursor-pointer outline-none hover:bg-neutral-500 appearance-none"
          >
            <option value="pl">Men's Premier League</option>
            <option value="wsl">Women's Super League</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/70 text-xs">▼</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-cm-panel border-b-2 border-cm-border flex">
        {([['leaderboard', 'All Time Rankings'], ['xi', 'Best XI'], ['years', 'Years']] as [Tab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-1.5 text-sm font-bold border-r border-cm-border transition-none ${
              tab === t
                ? 'bg-cm-yellow text-black'
                : 'text-cm-cyan hover:bg-cm-border'
            }`}
          >
            {label}
          </button>
        ))}
        <div className="flex-1 hidden sm:flex items-center justify-end px-4">
          <span className="text-cm-cyan text-xs">{league === 'pl' ? 'PFA Awards 1992–2025' : 'PFA Women\'s Awards 2013–2025'} &nbsp;|&nbsp; Player of Year 3pts · Team of Year 1pt · Young Player of Year 1pt</span>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
        {tab === 'leaderboard' ? (
          <Leaderboard ranked={ranked} awards={activeAwards} />
        ) : tab === 'xi' ? (
          <BestXI xi={xi} subs={subs} />
        ) : (
          <YearsPage awards={activeAwards} players={activePlayers} />
        )}
      </main>
    </div>
  );
}
