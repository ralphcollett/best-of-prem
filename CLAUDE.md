# CLAUDE.md

## Project overview

This is a Premier League all-time rankings app. It ranks players by PFA award points and selects a Best XI.

## Scoring rules (critical — do not change without user confirmation)

- PFA Players' Player of the Year = **3 pts**
- PFA Team of the Year = **1 pt**
- PFA Young Player of the Year = **1 pt**
- Each award counts once per season, even if the same award appears twice for that season
- A TOTY selection still scores in a season the player also won POTY — the two are not mutually exclusive
- Tiebreakers for equal scores, in order: POTY wins, then YPOTY wins; still-equal players share a rank

Scoring logic is in `src/utils/scoring.ts`.

## Data files

- `src/data/players.ts` — player registry (id, name, positions, optional image)
- `src/data/awards.ts` — all award entries (playerId, season, type)

Award `playerId` values must exactly match `id` values in `players.ts`. Any mismatch causes the award to be silently ignored. Run the mismatch check below after editing data.

## Adding a new season

1. Add missing players to `src/data/players.ts`
2. Add POTY, YPOTY, and TOTY entries to `src/data/awards.ts` under the new season (e.g. `"2025-26"`)
3. Run the mismatch check and TypeScript compile to verify

## Mismatch check

Run this to find award entries with no matching player:

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

Formation is 4-3-3. Slot-to-position mapping is in `src/utils/bestXI.ts`. The XI is auto-selected by taking the highest-ranked eligible player per slot in order. Midfield slots accept MF; the three attacking slots (LW/ST/RW) accept FW or MF.

## Commands

```bash
npm run dev      # dev server at localhost:5173
npm run build    # production build
npx tsc --noEmit # type-check only
```
