import { Position } from '../data/players';
import { PlayerScore } from './scoring';

export type Formation = '4-3-3' | '4-4-2' | '5-3-2';

interface FormationSlot {
  slot: string;
  positions: Position[];
}

// Each formation defines its slots and which player positions are eligible per slot.
// Midfield slots in 4-4-2 accept wide players (RW/LW) as well as central midfielders.
const FORMATIONS: Record<Formation, FormationSlot[]> = {
  '4-3-3': [
    { slot: 'GK',  positions: ['GK'] },
    { slot: 'RB',  positions: ['RB'] },
    { slot: 'CB1', positions: ['CB'] },
    { slot: 'CB2', positions: ['CB'] },
    { slot: 'LB',  positions: ['LB'] },
    { slot: 'CM1', positions: ['CM', 'CDM', 'CAM'] },
    { slot: 'CM2', positions: ['CM', 'CDM', 'CAM'] },
    { slot: 'CM3', positions: ['CM', 'CDM', 'CAM'] },
    { slot: 'RW',  positions: ['RW'] },
    { slot: 'ST',  positions: ['ST'] },
    { slot: 'LW',  positions: ['LW'] },
  ],
  '4-4-2': [
    { slot: 'GK',  positions: ['GK'] },
    { slot: 'RB',  positions: ['RB'] },
    { slot: 'CB1', positions: ['CB'] },
    { slot: 'CB2', positions: ['CB'] },
    { slot: 'LB',  positions: ['LB'] },
    { slot: 'RM',  positions: ['RW', 'CM', 'CDM', 'CAM'] },
    { slot: 'CM1', positions: ['CM', 'CDM', 'CAM'] },
    { slot: 'CM2', positions: ['CM', 'CDM', 'CAM'] },
    { slot: 'LM',  positions: ['LW', 'CM', 'CDM', 'CAM'] },
    { slot: 'ST1', positions: ['ST'] },
    { slot: 'ST2', positions: ['ST'] },
  ],
  '5-3-2': [
    { slot: 'GK',  positions: ['GK'] },
    { slot: 'RWB', positions: ['RB'] },
    { slot: 'CB1', positions: ['CB'] },
    { slot: 'CB2', positions: ['CB'] },
    { slot: 'CB3', positions: ['CB'] },
    { slot: 'LWB', positions: ['LB'] },
    { slot: 'CM1', positions: ['CM', 'CDM', 'CAM'] },
    { slot: 'CM2', positions: ['CM', 'CDM', 'CAM'] },
    { slot: 'CM3', positions: ['CM', 'CDM', 'CAM'] },
    { slot: 'ST1', positions: ['ST'] },
    { slot: 'ST2', positions: ['ST'] },
  ],
};

// Pitch layout: rows from attack (index 0) to GK (last index), slots left to right.
export const PITCH_LAYOUTS: Record<Formation, string[][]> = {
  '4-3-3': [
    ['LW', 'ST', 'RW'],
    ['CM1', 'CM2', 'CM3'],
    ['LB', 'CB1', 'CB2', 'RB'],
    ['GK'],
  ],
  '4-4-2': [
    ['ST1', 'ST2'],
    ['LM', 'CM1', 'CM2', 'RM'],
    ['LB', 'CB1', 'CB2', 'RB'],
    ['GK'],
  ],
  '5-3-2': [
    ['ST1', 'ST2'],
    ['CM1', 'CM2', 'CM3'],
    ['LWB', 'CB1', 'CB2', 'CB3', 'RWB'],
    ['GK'],
  ],
};

export interface XISlot {
  slot: string;
  playerScore: PlayerScore | null;
}

export function selectBestXI(rankedPlayers: PlayerScore[], formation: Formation = '4-3-3'): XISlot[] {
  const used = new Set<string>();
  const result: XISlot[] = [];

  for (const { slot, positions } of FORMATIONS[formation]) {
    const candidate = rankedPlayers.find(
      (ps) => !used.has(ps.player.id) && positions.includes(ps.player.position)
    ) ?? null;

    if (candidate) used.add(candidate.player.id);
    result.push({ slot, playerScore: candidate });
  }

  return result;
}

const ANY: Position[] = ['GK', 'RB', 'CB', 'LB', 'CM', 'CDM', 'CAM', 'RW', 'LW', 'ST'];

const SUB_SLOTS: { positions: Position[] }[] = [
  { positions: ['GK'] }, // guaranteed GK
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
      (ps) => !used.has(ps.player.id) && positions.includes(ps.player.position)
    );
    if (candidate) {
      used.add(candidate.player.id);
      subs.push(candidate);
    }
  }

  return subs;
}
