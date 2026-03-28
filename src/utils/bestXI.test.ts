import { describe, it, expect } from 'vitest';
import { selectBestXI, PITCH_LAYOUTS } from './bestXI';
import { PlayerScore } from './scoring';
import { Player } from '../data/players';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makePS(id: string, position: Player['position'], score: number): PlayerScore {
  return {
    player: { id, name: id, position },
    score,
    breakdown: { potyCount: 0, totyCount: 0, ypotyCount: 0 },
  };
}

// Full squads per formation
function squad433(): PlayerScore[] {
  return [
    makePS('gk',  'GK',  10),
    makePS('rb',  'RB',  9),
    makePS('cb1', 'CB',  8),
    makePS('cb2', 'CB',  7),
    makePS('lb',  'LB',  6),
    makePS('cm1', 'CM',  5),
    makePS('cm2', 'CM',  4),
    makePS('cm3', 'CM',  3),
    makePS('rw',  'RW',  2),
    makePS('st',  'ST',  2),
    makePS('lw',  'LW',  1),
  ];
}

function squad442(): PlayerScore[] {
  return [
    makePS('gk',  'GK',  10),
    makePS('rb',  'RB',  9),
    makePS('cb1', 'CB',  8),
    makePS('cb2', 'CB',  7),
    makePS('lb',  'LB',  6),
    makePS('rw',  'RW',  5), // fills RM
    makePS('cm1', 'CM',  4),
    makePS('cm2', 'CM',  3),
    makePS('lw',  'LW',  2), // fills LM
    makePS('st1', 'ST',  2),
    makePS('st2', 'ST',  1),
  ];
}

function squad532(): PlayerScore[] {
  return [
    makePS('gk',  'GK',  10),
    makePS('rb',  'RB',  9),  // fills RWB
    makePS('cb1', 'CB',  8),
    makePS('cb2', 'CB',  7),
    makePS('cb3', 'CB',  6),
    makePS('lb',  'LB',  5),  // fills LWB
    makePS('cm1', 'CM',  4),
    makePS('cm2', 'CM',  3),
    makePS('cm3', 'CM',  2),
    makePS('st1', 'ST',  2),
    makePS('st2', 'ST',  1),
  ];
}

// ─── 4-3-3 ────────────────────────────────────────────────────────────────────

describe('selectBestXI (4-3-3)', () => {
  it('returns 11 slots', () => {
    expect(selectBestXI(squad433(), '4-3-3')).toHaveLength(11);
  });

  it('fills every slot when a full squad is available', () => {
    const xi = selectBestXI(squad433(), '4-3-3');
    expect(xi.filter(s => s.playerScore === null)).toHaveLength(0);
  });

  it('assigns the correct slot labels', () => {
    const slots = selectBestXI(squad433(), '4-3-3').map(s => s.slot);
    expect(slots).toEqual(['GK', 'RB', 'CB1', 'CB2', 'LB', 'CM1', 'CM2', 'CM3', 'RW', 'ST', 'LW']);
  });

  it('picks the highest-ranked eligible player for each slot', () => {
    const ranked = [makePS('best-gk', 'GK', 20), makePS('worse-gk', 'GK', 10), ...squad433().filter(ps => ps.player.position !== 'GK')];
    const xi = selectBestXI(ranked, '4-3-3');
    expect(xi.find(s => s.slot === 'GK')!.playerScore?.player.id).toBe('best-gk');
  });

  it('does not pick the same player twice', () => {
    const xi = selectBestXI(squad433(), '4-3-3');
    const ids = xi.map(s => s.playerScore?.player.id).filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('leaves a slot null when no eligible player is available', () => {
    const noRB = squad433().filter(ps => ps.player.position !== 'RB');
    const xi = selectBestXI(noRB, '4-3-3');
    expect(xi.find(s => s.slot === 'RB')!.playerScore).toBeNull();
  });

  it('CDM fills a midfield slot', () => {
    const ranked = [...squad433().filter(ps => ps.player.position !== 'CM'), makePS('cdm', 'CDM', 5)];
    const xi = selectBestXI(ranked, '4-3-3');
    const midIds = xi.filter(s => s.slot.startsWith('CM')).map(s => s.playerScore?.player.id);
    expect(midIds).toContain('cdm');
  });

  it('CAM fills a midfield slot', () => {
    const ranked = [...squad433().filter(ps => ps.player.position !== 'CM'), makePS('cam', 'CAM', 5)];
    const xi = selectBestXI(ranked, '4-3-3');
    const midIds = xi.filter(s => s.slot.startsWith('CM')).map(s => s.playerScore?.player.id);
    expect(midIds).toContain('cam');
  });

  it('fills both CB slots with the two highest-ranked CBs', () => {
    const ranked = [...squad433().filter(ps => ps.player.position !== 'CB'), makePS('cb-a', 'CB', 8), makePS('cb-b', 'CB', 7), makePS('cb-c', 'CB', 6)];
    const xi = selectBestXI(ranked, '4-3-3');
    const cbIds = xi.filter(s => s.slot === 'CB1' || s.slot === 'CB2').map(s => s.playerScore?.player.id);
    expect(cbIds).toContain('cb-a');
    expect(cbIds).toContain('cb-b');
    expect(cbIds).not.toContain('cb-c');
  });

  it('returns all-null slots when given an empty player list', () => {
    const xi = selectBestXI([], '4-3-3');
    expect(xi).toHaveLength(11);
    expect(xi.every(s => s.playerScore === null)).toBe(true);
  });
});

// ─── 4-4-2 ────────────────────────────────────────────────────────────────────

describe('selectBestXI (4-4-2)', () => {
  it('returns 11 slots', () => {
    expect(selectBestXI(squad442(), '4-4-2')).toHaveLength(11);
  });

  it('assigns the correct slot labels', () => {
    const slots = selectBestXI(squad442(), '4-4-2').map(s => s.slot);
    expect(slots).toEqual(['GK', 'RB', 'CB1', 'CB2', 'LB', 'RM', 'CM1', 'CM2', 'LM', 'ST1', 'ST2']);
  });

  it('fills both striker slots', () => {
    const xi = selectBestXI(squad442(), '4-4-2');
    const stSlots = xi.filter(s => s.slot === 'ST1' || s.slot === 'ST2');
    expect(stSlots.every(s => s.playerScore !== null)).toBe(true);
  });

  it('RW player fills the RM slot', () => {
    const xi = selectBestXI(squad442(), '4-4-2');
    const rm = xi.find(s => s.slot === 'RM')!;
    expect(rm.playerScore?.player.position).toBe('RW');
  });

  it('LW player fills the LM slot', () => {
    const xi = selectBestXI(squad442(), '4-4-2');
    const lm = xi.find(s => s.slot === 'LM')!;
    expect(lm.playerScore?.player.position).toBe('LW');
  });

  it('does not pick the same player twice', () => {
    const xi = selectBestXI(squad442(), '4-4-2');
    const ids = xi.map(s => s.playerScore?.player.id).filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('leaves ST2 null when only one striker is available', () => {
    const oneST = squad442().filter(ps => ps.player.id !== 'st2');
    const xi = selectBestXI(oneST, '4-4-2');
    expect(xi.find(s => s.slot === 'ST2')!.playerScore).toBeNull();
  });
});

// ─── 5-3-2 ────────────────────────────────────────────────────────────────────

describe('selectBestXI (5-3-2)', () => {
  it('returns 11 slots', () => {
    expect(selectBestXI(squad532(), '5-3-2')).toHaveLength(11);
  });

  it('assigns the correct slot labels', () => {
    const slots = selectBestXI(squad532(), '5-3-2').map(s => s.slot);
    expect(slots).toEqual(['GK', 'RWB', 'CB1', 'CB2', 'CB3', 'LWB', 'CM1', 'CM2', 'CM3', 'ST1', 'ST2']);
  });

  it('fills all three CB slots', () => {
    const xi = selectBestXI(squad532(), '5-3-2');
    const cbSlots = xi.filter(s => ['CB1', 'CB2', 'CB3'].includes(s.slot));
    expect(cbSlots.every(s => s.playerScore !== null)).toBe(true);
  });

  it('RB player fills the RWB slot', () => {
    const xi = selectBestXI(squad532(), '5-3-2');
    const rwb = xi.find(s => s.slot === 'RWB')!;
    expect(rwb.playerScore?.player.position).toBe('RB');
  });

  it('LB player fills the LWB slot', () => {
    const xi = selectBestXI(squad532(), '5-3-2');
    const lwb = xi.find(s => s.slot === 'LWB')!;
    expect(lwb.playerScore?.player.position).toBe('LB');
  });

  it('leaves CB3 null when only two CBs are available', () => {
    const twoCBs = squad532().filter(ps => ps.player.id !== 'cb3');
    const xi = selectBestXI(twoCBs, '5-3-2');
    expect(xi.find(s => s.slot === 'CB3')!.playerScore).toBeNull();
  });

  it('does not pick the same player twice', () => {
    const xi = selectBestXI(squad532(), '5-3-2');
    const ids = xi.map(s => s.playerScore?.player.id).filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ─── PITCH_LAYOUTS ────────────────────────────────────────────────────────────

describe('PITCH_LAYOUTS', () => {
  it('4-3-3 has 4 rows totalling 11 slots', () => {
    const all = PITCH_LAYOUTS['4-3-3'].flat();
    expect(all).toHaveLength(11);
  });

  it('4-4-2 has 4 rows totalling 11 slots', () => {
    const all = PITCH_LAYOUTS['4-4-2'].flat();
    expect(all).toHaveLength(11);
  });

  it('5-3-2 has 4 rows totalling 11 slots', () => {
    const all = PITCH_LAYOUTS['5-3-2'].flat();
    expect(all).toHaveLength(11);
  });

  it('each formation pitch layout slot matches a formation slot', () => {
    // Every slot name in the pitch layout should appear in the XI output
    for (const formation of ['4-3-3', '4-4-2', '5-3-2'] as const) {
      const xiSlotNames = new Set(selectBestXI([], formation).map(s => s.slot));
      for (const slot of PITCH_LAYOUTS[formation].flat()) {
        expect(xiSlotNames.has(slot), `${formation}: pitch slot "${slot}" not in XI slots`).toBe(true);
      }
    }
  });
});
