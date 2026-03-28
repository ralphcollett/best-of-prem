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
    <div className="min-h-screen bg-cm-bg font-mono text-white">
      {/* Title bar */}
      <div className="bg-cm-red border-b-2 border-yellow-600 px-4 py-2">
        <h1 className="text-cm-yellow font-bold text-lg uppercase tracking-wide text-center">
          Premier League All-Time Select
        </h1>
      </div>

      {/* Tab bar */}
      <div className="bg-cm-panel border-b-2 border-cm-border flex">
        {([['leaderboard', 'Top 10 Players'], ['xi', 'Best XI']] as [Tab, string][]).map(([t, label]) => (
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
        <div className="flex-1 flex items-center justify-end px-4">
          <span className="text-cm-cyan text-xs">PFA Awards 1992–2025 &nbsp;|&nbsp; POTY 4pts · TOTY 2pts · YPOTY 1pt</span>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'leaderboard' ? (
          <Leaderboard ranked={ranked} />
        ) : (
          <BestXI xi={xi} formation={formation} onFormationChange={setFormation} />
        )}
      </main>
    </div>
  );
}
