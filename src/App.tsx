import { useMemo, useState } from 'react';
import { players } from './data/players';
import { awards } from './data/awards';
import { getRankedPlayers } from './utils/scoring';
import { selectBestXI, Formation } from './utils/bestXI';
import { Leaderboard } from './components/Leaderboard';
import { BestXI } from './components/BestXI';

type Tab = 'leaderboard' | 'xi';

export default function App() {
  const [tab, setTab] = useState<Tab>('leaderboard');
  const [formation, setFormation] = useState<Formation>('4-3-3');

  const ranked = useMemo(() => getRankedPlayers(players, awards), []);
  const xi = useMemo(() => selectBestXI(ranked, formation), [ranked, formation]);

  return (
    <div className="min-h-screen bg-pl-purple text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-baseline gap-3">
            <span className="text-pl-green text-3xl font-black tracking-tight">Premier League</span>
            <span className="text-white/60 text-lg">All-Time Rankings</span>
          </div>
          <p className="text-white/40 text-sm mt-1">
            Ranked by PFA awards — Player of the Year (4pts) · Team of the Year (2pts) · Young Player of the Year (1pt)
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
          {(['leaderboard', 'xi'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === t
                  ? 'bg-pl-green text-pl-purple shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {t === 'leaderboard' ? 'Top 10' : 'Best XI'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {tab === 'leaderboard' ? (
          <Leaderboard ranked={ranked} />
        ) : (
          <BestXI xi={xi} formation={formation} onFormationChange={setFormation} />
        )}
      </main>

      <footer className="max-w-4xl mx-auto px-4 pb-8 text-white/20 text-xs">
        Awards data: PFA Players' Player of the Year, PFA Team of the Year, PFA Young Player of the Year (1992–2024).
        TOTY points not awarded in seasons where the player also won POTY.
      </footer>
    </div>
  );
}
