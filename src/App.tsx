import { useMemo, useRef, useState, useEffect } from 'react';
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
  const [leagueOpen, setLeagueOpen] = useState(false);
  const leagueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (leagueRef.current && !leagueRef.current.contains(e.target as Node)) {
        setLeagueOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
      <div className="bg-cm-red border-b-2 border-yellow-600 px-4 py-2 flex items-center justify-between gap-2">
        <div className="hidden sm:block sm:w-40 shrink-0" />
        <h1 className="text-cm-yellow font-bold text-sm sm:text-lg uppercase tracking-wide text-center flex-1 leading-tight">
          {league === 'pl' ? 'Premier League' : "Women's Super League"} All-Time Select
        </h1>
        {/* League dropdown */}
        <div className="shrink-0 sm:w-40 flex justify-end">
          <div ref={leagueRef} className="relative flex items-center gap-2">
            <div
              className="relative inline-flex items-stretch text-black text-xs font-mono cursor-pointer"
              style={{ border: '2px solid', borderColor: '#808080 #ffffff #ffffff #808080', background: '#c0c0c0' }}
              onClick={() => setLeagueOpen(o => !o)}
            >
              <span className="pl-1.5 pr-7 py-0.5 whitespace-nowrap font-bold text-sm" style={{ minWidth: '80px' }}>
                League
              </span>
              <div
                className="absolute right-0 top-0 bottom-0 w-5 flex items-center justify-center select-none"
                style={{ borderLeft: '1px solid #808080', background: '#c0c0c0' }}
              >
                <span style={{ fontSize: '8px', lineHeight: 1 }}>▼</span>
              </div>
            </div>
            {leagueOpen && (
              <div
                className="absolute top-full right-0 mt-px z-50 text-black text-xs font-mono"
                style={{ border: '2px solid', borderColor: '#808080 #ffffff #ffffff #808080', background: '#c0c0c0', minWidth: '110px' }}
              >
                {([['pl', "Men's PL"], ['wsl', "Women's WSL"]] as [League, string][]).map(([v, label]) => (
                  <div
                    key={v}
                    onClick={() => { setLeague(v); setLeagueOpen(false); }}
                    className="px-2 py-0.5 cursor-pointer whitespace-nowrap"
                    style={league === v ? { background: '#000080', color: '#fff' } : undefined}
                    onMouseEnter={e => { if (league !== v) (e.currentTarget as HTMLElement).style.background = '#000080'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                    onMouseLeave={e => { if (league !== v) { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = ''; } }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-cm-panel border-b-2 border-cm-border flex">
        {([['leaderboard', 'All Time Rankings'], ['xi', 'Best XI'], ['years', 'Years']] as [Tab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 sm:px-6 py-1.5 text-xs sm:text-sm font-bold border-r border-cm-border transition-none ${
              tab === t
                ? 'bg-cm-yellow text-black'
                : 'text-cm-cyan hover:bg-cm-border'
            }`}
          >
            {label}
          </button>
        ))}
        <div className="flex-1 hidden sm:flex items-center justify-end px-4">
          <span className="text-cm-cyan text-xs">{league === 'pl' ? 'PFA Awards 1992–2026' : 'PFA Women\'s Awards 2013–2026'} &nbsp;|&nbsp; Player of Year 3pts · Team of Year 1pt · Young Player of Year 1pt</span>
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
