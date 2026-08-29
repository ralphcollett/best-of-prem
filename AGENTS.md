# AGENTS.md

## Project overview

This is a Premier League all-time rankings app. It ranks players by PFA award points and
selects a Best XI. It covers both the men's Premier League and the Women's Super League,
switched via a toggle in the UI.

> This file and `CLAUDE.md` are kept identical below the title. Change both together.

## Scoring rules (critical — do not change without user confirmation)

- PFA Players' Player of the Year = **3 pts**
- PFA Team of the Year = **1 pt**
- PFA Young Player of the Year = **1 pt**
- Each award counts once per season, even if the same award appears more than once that season
- A TOTY selection still scores in a season the player also won POTY. The two are not mutually
  exclusive, so a POTY season is worth 4 pts in total (3 + 1)
- Tiebreakers for equal scores, in order: POTY count (descending), then YPOTY count
  (descending). Players still equal share a rank, displayed as `=N`

Scoring logic is in `src/utils/scoring.ts` and is pinned by `src/utils/scoring.test.ts`.

## Data files

- `src/data/players.ts` — player registry (id, name, positions, optional image)
- `src/data/awards.ts` — all award entries (playerId, season, type, club)
- `src/data/wsl-players.ts` / `src/data/wsl-awards.ts` — the same two registries for the WSL

Award `playerId` values must exactly match `id` values in the corresponding players file. Any
mismatch causes the award to be silently ignored. Run the mismatch check below after editing
data, or just `npm test`.

## Adding a new season

1. Add missing players to `src/data/players.ts`
2. Add announced POTY, YPOTY, and TOTY entries to `src/data/awards.ts` under the new season
   (e.g. `"2025-26"`). It is fine to add POTY and YPOTY before TOTY has been announced.
   A player can win POTY and YPOTY in the same season — record both.
3. Bump the season range shown in the header in `src/App.tsx`
4. Run the mismatch check, the tests, and a TypeScript compile to verify

WSL seasons follow the same steps against the `wsl-` files.

## Mismatch check

`npm test` runs this for both the PL and WSL data via `src/data/integrity.test.ts`. To check
the PL data by hand:

```bash
node -e "
const fs = require('fs');
const awards = fs.readFileSync('./src/data/awards.ts', 'utf8');
const players = fs.readFileSync('./src/data/players.ts', 'utf8');
const awardIds = [...awards.matchAll(/playerId: '([^']+)'/g)].map(m => m[1]);
const playerIds = new Set([...players.matchAll(/id: '([^']+)'/g)].map(m => m[1]));
const missing = [...new Set(awardIds)].filter(id => !playerIds.has(id));
console.log(missing.length ? missing : 'All OK');
"
```

## Best XI

Formation is 4-3-3. Slot-to-position mapping is in `src/utils/bestXI.ts`. The XI is
auto-selected by taking the highest-ranked eligible player per slot in order. Midfield slots
accept `MF`; the three attacking slots (LW/ST/RW) accept `FW` or `MF`.

## Commands

```bash
npm run dev      # dev server at localhost:5173
npm run build    # production build
npm test         # unit tests + data integrity checks
npx tsc --noEmit # type-check only
```
