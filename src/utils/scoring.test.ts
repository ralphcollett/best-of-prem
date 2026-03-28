import { describe, it, expect } from 'vitest';
import { calculateScores, getRankedPlayers } from './scoring';
import { Player } from '../data/players';
import { Award } from '../data/awards';

// ─── Fixtures ───────────────────────────────────────────────────────────────

const gk: Player = { id: 'gk', name: 'GK Player', position: 'GK', nationality: 'English', clubs: ['Club A'], appearances: 100 };
const st: Player = { id: 'st', name: 'ST Player', position: 'ST', nationality: 'English', clubs: ['Club A'], appearances: 200 };
const cm: Player = { id: 'cm', name: 'CM Player', position: 'CM', nationality: 'English', clubs: ['Club A'], appearances: 150 };

// ─── calculateScores ─────────────────────────────────────────────────────────

describe('calculateScores', () => {
  it('returns zero score for a player with no awards', () => {
    const result = calculateScores([st], []);
    expect(result[0].score).toBe(0);
    expect(result[0].breakdown).toEqual({ potyCount: 0, totyCount: 0, ypotyCount: 0 });
  });

  it('scores POTY as 4 pts', () => {
    const awards: Award[] = [{ playerId: 'st', season: '2000-01', type: 'POTY' }];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(4);
    expect(result[0].breakdown.potyCount).toBe(1);
  });

  it('scores TOTY as 2 pts', () => {
    const awards: Award[] = [{ playerId: 'st', season: '2000-01', type: 'TOTY' }];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(2);
    expect(result[0].breakdown.totyCount).toBe(1);
  });

  it('scores YPOTY as 1 pt', () => {
    const awards: Award[] = [{ playerId: 'st', season: '2000-01', type: 'YPOTY' }];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(1);
    expect(result[0].breakdown.ypotyCount).toBe(1);
  });

  it('does not add TOTY points when player also won POTY in the same season', () => {
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY' },
      { playerId: 'st', season: '2000-01', type: 'TOTY' },
    ];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(4); // 4 (POTY) — TOTY excluded
    expect(result[0].breakdown.potyCount).toBe(1);
    expect(result[0].breakdown.totyCount).toBe(0);
  });

  it('adds TOTY points when POTY and TOTY are in different seasons', () => {
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY' },
      { playerId: 'st', season: '2001-02', type: 'TOTY' },
    ];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(6); // 4 + 2
    expect(result[0].breakdown.potyCount).toBe(1);
    expect(result[0].breakdown.totyCount).toBe(1);
  });

  it('always adds YPOTY even when POTY is won in the same season', () => {
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY' },
      { playerId: 'st', season: '2000-01', type: 'YPOTY' },
    ];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(5); // 4 + 1
    expect(result[0].breakdown.ypotyCount).toBe(1);
  });

  it('accumulates correctly across multiple seasons', () => {
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY' },
      { playerId: 'st', season: '2000-01', type: 'TOTY' }, // excluded
      { playerId: 'st', season: '2001-02', type: 'TOTY' },
      { playerId: 'st', season: '2001-02', type: 'YPOTY' },
      { playerId: 'st', season: '2002-03', type: 'POTY' },
    ];
    const result = calculateScores([st], awards);
    // Season 2000-01: POTY=4, TOTY=excluded → 4
    // Season 2001-02: TOTY=2, YPOTY=1 → 3
    // Season 2002-03: POTY=4 → 4
    expect(result[0].score).toBe(11);
    expect(result[0].breakdown).toEqual({ potyCount: 2, totyCount: 1, ypotyCount: 1 });
  });

  it('ignores awards for other players', () => {
    const awards: Award[] = [
      { playerId: 'cm', season: '2000-01', type: 'POTY' },
    ];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(0);
  });

  it('scores multiple players independently', () => {
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY' },
      { playerId: 'cm', season: '2000-01', type: 'TOTY' },
    ];
    const results = calculateScores([st, cm], awards);
    const stResult = results.find(r => r.player.id === 'st')!;
    const cmResult = results.find(r => r.player.id === 'cm')!;
    expect(stResult.score).toBe(4);
    expect(cmResult.score).toBe(2);
  });
});

// ─── getRankedPlayers ─────────────────────────────────────────────────────────

describe('getRankedPlayers', () => {
  it('filters out players with zero score', () => {
    const awards: Award[] = [{ playerId: 'st', season: '2000-01', type: 'POTY' }];
    const results = getRankedPlayers([st, gk], awards);
    expect(results).toHaveLength(1);
    expect(results[0].player.id).toBe('st');
  });

  it('sorts players by score descending', () => {
    const awards: Award[] = [
      { playerId: 'gk', season: '2000-01', type: 'TOTY' },       // 2 pts
      { playerId: 'st', season: '2000-01', type: 'POTY' },       // 4 pts
      { playerId: 'cm', season: '2000-01', type: 'YPOTY' },      // 1 pt
    ];
    const results = getRankedPlayers([gk, st, cm], awards);
    expect(results.map(r => r.player.id)).toEqual(['st', 'gk', 'cm']);
  });

  it('breaks score ties by appearances descending', () => {
    // st has 200 appearances, gk has 100 — both score 2 pts
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'TOTY' },
      { playerId: 'gk', season: '2001-02', type: 'TOTY' },
    ];
    const results = getRankedPlayers([gk, st], awards);
    expect(results[0].player.id).toBe('st'); // more appearances
    expect(results[1].player.id).toBe('gk');
  });
});
