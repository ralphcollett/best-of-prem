import { describe, it, expect } from 'vitest';
import { calculateScores, getRankedPlayers } from './scoring';
import { Player } from '../data/players';
import { Award } from '../data/awards';

// ─── Fixtures ───────────────────────────────────────────────────────────────

const gk: Player = { id: 'gk', name: 'GK Player', positions: ['GK'] };
const st: Player = { id: 'st', name: 'ST Player', positions: ['FW'] };
const cm: Player = { id: 'cm', name: 'CM Player', positions: ['MF'] };

// ─── calculateScores ─────────────────────────────────────────────────────────

describe('calculateScores', () => {
  it('returns zero score for a player with no awards', () => {
    const result = calculateScores([st], []);
    expect(result[0].score).toBe(0);
    expect(result[0].breakdown).toEqual({ potyCount: 0, totyCount: 0, ypotyCount: 0 });
  });

  it('scores POTY as 3 pts', () => {
    const awards: Award[] = [{ playerId: 'st', season: '2000-01', type: 'POTY', club: 'Club A' }];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(3);
    expect(result[0].breakdown.potyCount).toBe(1);
  });

  it('scores TOTY as 1 pt', () => {
    const awards: Award[] = [{ playerId: 'st', season: '2000-01', type: 'TOTY', club: 'Club A' }];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(1);
    expect(result[0].breakdown.totyCount).toBe(1);
  });

  it('scores YPOTY as 1 pt', () => {
    const awards: Award[] = [{ playerId: 'st', season: '2000-01', type: 'YPOTY', club: 'Club A' }];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(1);
    expect(result[0].breakdown.ypotyCount).toBe(1);
  });

  it('adds TOTY points even when player also won POTY in the same season', () => {
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY', club: 'Club A' },
      { playerId: 'st', season: '2000-01', type: 'TOTY', club: 'Club A' },
    ];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(4); // 3 (POTY) + 1 (TOTY)
    expect(result[0].breakdown.potyCount).toBe(1);
    expect(result[0].breakdown.totyCount).toBe(1);
  });

  it('adds TOTY points when POTY and TOTY are in different seasons', () => {
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY', club: 'Club A' },
      { playerId: 'st', season: '2001-02', type: 'TOTY', club: 'Club A' },
    ];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(4); // 3 + 1
    expect(result[0].breakdown.potyCount).toBe(1);
    expect(result[0].breakdown.totyCount).toBe(1);
  });

  it('always adds YPOTY even when POTY is won in the same season', () => {
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY', club: 'Club A' },
      { playerId: 'st', season: '2000-01', type: 'YPOTY', club: 'Club A' },
    ];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(4); // 3 + 1
    expect(result[0].breakdown.ypotyCount).toBe(1);
  });

  it('accumulates correctly across multiple seasons', () => {
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY', club: 'Club A' },
      { playerId: 'st', season: '2000-01', type: 'TOTY', club: 'Club A' },
      { playerId: 'st', season: '2001-02', type: 'TOTY', club: 'Club A' },
      { playerId: 'st', season: '2001-02', type: 'YPOTY', club: 'Club A' },
      { playerId: 'st', season: '2002-03', type: 'POTY', club: 'Club A' },
    ];
    const result = calculateScores([st], awards);
    // Season 2000-01: POTY=3, TOTY=1 → 4
    // Season 2001-02: TOTY=1, YPOTY=1 → 2
    // Season 2002-03: POTY=3 → 3
    expect(result[0].score).toBe(9);
    expect(result[0].breakdown).toEqual({ potyCount: 2, totyCount: 2, ypotyCount: 1 });
  });

  it('ignores awards for other players', () => {
    const awards: Award[] = [
      { playerId: 'cm', season: '2000-01', type: 'POTY', club: 'Club A' },
    ];
    const result = calculateScores([st], awards);
    expect(result[0].score).toBe(0);
  });

  it('scores multiple players independently', () => {
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY', club: 'Club A' },
      { playerId: 'cm', season: '2000-01', type: 'TOTY', club: 'Club A' },
    ];
    const results = calculateScores([st, cm], awards);
    const stResult = results.find(r => r.player.id === 'st')!;
    const cmResult = results.find(r => r.player.id === 'cm')!;
    expect(stResult.score).toBe(3);
    expect(cmResult.score).toBe(1);
  });
});

// ─── getRankedPlayers ─────────────────────────────────────────────────────────

describe('getRankedPlayers', () => {
  it('filters out players with zero score', () => {
    const awards: Award[] = [{ playerId: 'st', season: '2000-01', type: 'POTY', club: 'Club A' }];
    const results = getRankedPlayers([st, gk], awards);
    expect(results).toHaveLength(1);
    expect(results[0].player.id).toBe('st');
  });

  it('sorts players by score descending', () => {
    const awards: Award[] = [
      { playerId: 'gk', season: '2000-01', type: 'TOTY', club: 'Club A' },       // 1 pt
      { playerId: 'st', season: '2000-01', type: 'POTY', club: 'Club A' },       // 3 pts
      { playerId: 'cm', season: '2000-01', type: 'YPOTY', club: 'Club A' },      // 1 pt
    ];
    const results = getRankedPlayers([gk, st, cm], awards);
    // st(3) first; cm(ypotyCount=1) beats gk(ypotyCount=0) on tiebreaker
    expect(results.map(r => r.player.id)).toEqual(['st', 'cm', 'gk']);
  });

  it('breaks score ties by potyCount descending', () => {
    // st has 1 POTY (3pts), gk has 3 TOTYs (3pts) — same score, st wins by potyCount
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'POTY', club: 'Club A' },
      { playerId: 'gk', season: '2000-01', type: 'TOTY', club: 'Club A' },
      { playerId: 'gk', season: '2001-02', type: 'TOTY', club: 'Club A' },
      { playerId: 'gk', season: '2002-03', type: 'TOTY', club: 'Club A' },
    ];
    const results = getRankedPlayers([gk, st], awards);
    expect(results[0].player.id).toBe('st'); // higher potyCount
    expect(results[1].player.id).toBe('gk');
  });

  it('breaks potyCount ties by ypotyCount descending', () => {
    // st has TOTY+YPOTY (2pts), gk has TOTY+TOTY (2pts) — same score, same potyCount; st wins by ypotyCount
    const awards: Award[] = [
      { playerId: 'st', season: '2000-01', type: 'TOTY', club: 'Club A' },
      { playerId: 'st', season: '2000-01', type: 'YPOTY', club: 'Club A' },
      { playerId: 'gk', season: '2001-02', type: 'TOTY', club: 'Club A' },
      { playerId: 'gk', season: '2002-03', type: 'TOTY', club: 'Club A' },
    ];
    const results = getRankedPlayers([gk, st], awards);
    expect(results[0].player.id).toBe('st'); // has ypotyCount=1
    expect(results[1].player.id).toBe('gk');
  });
});
