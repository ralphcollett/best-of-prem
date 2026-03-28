# Best of the Premier League

A React app that ranks the greatest Premier League players of all time using PFA award data, and selects an all-time Best XI.

## Scoring System

| Award | Points | Notes |
|---|---|---|
| PFA Players' Player of the Year | 4 pts | Per season won |
| PFA Team of the Year | 2 pts | Not counted if player also won POTY that season |
| PFA Young Player of the Year | 1 pt | Per season won |

**Tiebreaker**: Total Premier League appearances.

Data covers the full Premier League era: 1992–93 to 2024–25.

## Features

- **Top 10 leaderboard** — ranked by points with per-player award breakdown
- **Best XI** — auto-selected 4-3-3 using the highest-scoring eligible player per position slot

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Data

All award data lives in `src/data/awards.ts`. Player details (positions, appearances) are in `src/data/players.ts`. Both files are plain TypeScript — edit them directly to correct or extend the data.

To add a new season:
1. Add any new players to `src/data/players.ts`
2. Add POTY, YPOTY, and TOTY entries for the season to `src/data/awards.ts`
