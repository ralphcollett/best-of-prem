import { Position } from '../data/players';
import { PlayerScore } from './scoring';

interface FormationSlot {
  slot: string;
  positions: Position[];
}

const FORMATION_SLOTS: FormationSlot[] = [
  { slot: 'GK',  positions: ['GK'] },
  { slot: 'RB',  positions: ['RB'] },
  { slot: 'CB1', positions: ['CB'] },
  { slot: 'CB2', positions: ['CB'] },
  { slot: 'LB',  positions: ['LB'] },
  { slot: 'CM1', positions: ['MF'] },
  { slot: 'CM2', positions: ['MF'] },
  { slot: 'CM3', positions: ['MF'] },
  { slot: 'RW',  positions: ['FW', 'MF'] },
  { slot: 'ST',  positions: ['FW', 'MF'] },
  { slot: 'LW',  positions: ['FW', 'MF'] },
];

export const PITCH_LAYOUT: string[][] = [
  ['LW', 'ST', 'RW'],
  ['CM1', 'CM2', 'CM3'],
  ['LB', 'CB1', 'CB2', 'RB'],
  ['GK'],
];

export interface XISlot {
  slot: string;
  playerScore: PlayerScore | null;
}

export function selectBestXI(rankedPlayers: PlayerScore[]): XISlot[] {
  const used = new Set<string>();
  const result: XISlot[] = [];

  for (const { slot, positions } of FORMATION_SLOTS) {
    const candidate = rankedPlayers.find(
      (ps) => !used.has(ps.player.id) && ps.player.positions.some(p => positions.includes(p))
    ) ?? null;

    if (candidate) used.add(candidate.player.id);
    result.push({ slot, playerScore: candidate });
  }

  return result;
}

const ANY: Position[] = ['GK', 'RB', 'CB', 'LB', 'MF', 'FW'];

const SUB_SLOTS: { positions: Position[] }[] = [
  { positions: ['GK'] },
  { positions: ANY },
  { positions: ANY },
  { positions: ANY },
  { positions: ANY },
  { positions: ANY },
  { positions: ANY },
];

export function selectSubs(rankedPlayers: PlayerScore[], usedIds: Set<string>): PlayerScore[] {
  const used = new Set(usedIds);
  const subs: PlayerScore[] = [];

  for (const { positions } of SUB_SLOTS) {
    const candidate = rankedPlayers.find(
      (ps) => !used.has(ps.player.id) && ps.player.positions.some(p => positions.includes(p))
    );
    if (candidate) {
      used.add(candidate.player.id);
      subs.push(candidate);
    }
  }

  return subs;
}
