Add the PFA awards for a new Premier League season.

The season to add is: $ARGUMENTS

## Steps

### 1. Look up the awards

Search the web for the PFA awards for this season:
- PFA Players' Player of the Year (POTY)
- PFA Young Player of the Year (YPOTY)
- PFA Team of the Year (TOTY) — 11 players

Use Wikipedia and thepfa.com as primary sources. Confirm the TOTY list is exactly 11 players in a 4-4-2 or 4-3-3 or whatever formation the PFA used that year.

### 2. Add any new players to `src/data/players.ts`

For each award winner not already in the file, add an entry. Follow existing conventions:
- `id`: lowercase hyphenated, e.g. `'salah'`, `'trent'`, `'van-dijk'`
- `name`: full display name
- `positions`: one of `'GK' | 'RB' | 'CB' | 'LB' | 'MF' | 'FW'`
- Insert in the appropriate position group (Goalkeepers / Defenders / Midfielders / Forwards)

### 3. Add award entries to `src/data/awards.ts`

Append under the correct sections in this order:
1. POTY section — one entry
2. YPOTY section — one entry (skip if winner also won POTY)
3. TOTY section — 11 entries, with a `// YYYY-YY` comment header

Season string format: `'YYYY-YY'` (e.g. `'2025-26'`)

Example entries:
```ts
{ playerId: 'salah', season: '2025-26', type: 'POTY', club: 'Liverpool' },
{ playerId: 'saka', season: '2025-26', type: 'YPOTY', club: 'Arsenal' },

// 2025-26
{ playerId: 'alisson', season: '2025-26', type: 'TOTY', club: 'Liverpool' },
// ... 10 more
```

### 4. Verify

Run the mismatch check:
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

Then type-check:
```bash
npx tsc --noEmit
```

Fix any errors before finishing.

### 5. Report back

Summarise what was added: POTY winner, YPOTY winner, and the 11 TOTY players with their clubs. Note any players who were new additions to `players.ts`.
