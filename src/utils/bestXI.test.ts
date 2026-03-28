import { describe, it, expect } from 'vitest';
import { selectBestXI, PITCH_LAYOUT } from './bestXI';
import { PlayerScore } from './scoring';
import { Position } from '../data/players';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makePS(id: string, positions: Position[], score: number): PlayerScore {
  return {
    player: { id, name: id, positions },
    score,
    breakdown: { potyCount: 0, totyCount: 0, ypotyCount: 0 },
  };
}

function squad433(): PlayerScore[] {
  return [
    makePS('gk',  ['GK'], 10),
    makePS('rb',  ['RB'],  9),
    makePS('cb1', ['CB'],  8),
    makePS('cb2', ['CB'],  7),
    makePS('lb',  ['LB'],  6),
    makePS('mf1', ['MF'],  5),
    makePS('mf2', ['MF'],  4),
    makePS('mf3', ['MF'],  3),
    makePS('fw1', ['FW'],  2),
    makePS('fw2', ['FW'],  2),
    makePS('fw3', ['FW'],  1),
  ];
}

// ─── selectBestXI ─────────────────────────────────────────────────────────────

describe('selectBestXI (4-3-3)', () => {
  it('returns 11 slots', () => {
    expect(selectBestXI(squad433())).toHaveLength(11);
  });

  it('fills every slot when a full squad is available', () => {
    const xi = selectBestXI(squad433());
    expect(xi.filter(s => s.playerScore === null)).toHaveLength(0);
  });

  it('assigns the correct slot labels', () => {
    const slots = selectBestXI(squad433()).map(s => s.slot);
    expect(slots).toEqual(['GK', 'RB', 'CB1', 'CB2', 'LB', 'CM1', 'CM2', 'CM3', 'RW', 'ST', 'LW']);
  });

  it('picks the highest-ranked eligible player for each slot', () => {
    const ranked = [makePS('best-gk', ['GK'], 20), makePS('worse-gk', ['GK'], 10), ...squad433().filter(ps => !ps.player.positions.includes('GK'))];
    const xi = selectBestXI(ranked);
    expect(xi.find(s => s.slot === 'GK')!.playerScore?.player.id).toBe('best-gk');
  });

  it('does not pick the same player twice', () => {
    const xi = selectBestXI(squad433());
    const ids = xi.map(s => s.playerScore?.player.id).filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('leaves a slot null when no eligible player is available', () => {
    const noRB = squad433().filter(ps => !ps.player.positions.includes('RB'));
    const xi = selectBestXI(noRB);
    expect(xi.find(s => s.slot === 'RB')!.playerScore).toBeNull();
  });

  it('fills both CB slots with the two highest-ranked CBs', () => {
    const ranked = [...squad433().filter(ps => !ps.player.positions.includes('CB')), makePS('cb-a', ['CB'], 8), makePS('cb-b', ['CB'], 7), makePS('cb-c', ['CB'], 6)];
    const xi = selectBestXI(ranked);
    const cbIds = xi.filter(s => s.slot === 'CB1' || s.slot === 'CB2').map(s => s.playerScore?.player.id);
    expect(cbIds).toContain('cb-a');
    expect(cbIds).toContain('cb-b');
    expect(cbIds).not.toContain('cb-c');
  });

  it('a player with MF+FW positions can fill a forward slot', () => {
    const ranked = [...squad433().filter(ps => !ps.player.positions.includes('FW')), makePS('dual', ['MF', 'FW'], 2)];
    const xi = selectBestXI(ranked);
    const fwSlotIds = xi.filter(s => ['RW', 'ST', 'LW'].includes(s.slot)).map(s => s.playerScore?.player.id);
    expect(fwSlotIds).toContain('dual');
  });

  it('returns all-null slots when given an empty player list', () => {
    const xi = selectBestXI([]);
    expect(xi).toHaveLength(11);
    expect(xi.every(s => s.playerScore === null)).toBe(true);
  });
});

// ─── PITCH_LAYOUT ────────────────────────────────────────────────────────────

describe('PITCH_LAYOUT', () => {
  it('has 4 rows totalling 11 slots', () => {
    const all = PITCH_LAYOUT.flat();
    expect(all).toHaveLength(11);
  });

  it('each pitch layout slot matches a formation slot', () => {
    const xiSlotNames = new Set(selectBestXI([]).map(s => s.slot));
    for (const slot of PITCH_LAYOUT.flat()) {
      expect(xiSlotNames.has(slot), `pitch slot "${slot}" not in XI slots`).toBe(true);
    }
  });
});
