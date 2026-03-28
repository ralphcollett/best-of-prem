import { Award } from '../data/awards';
import { Player } from '../data/players';

export interface PlayerScore {
  player: Player;
  score: number;
  breakdown: {
    potyCount: number;
    totyCount: number; // effective (excluded if POTY same season)
    ypotyCount: number;
  };
}

export function calculateScores(players: Player[], awards: Award[]): PlayerScore[] {
  return players.map((player) => {
    const playerAwards = awards.filter((a) => a.playerId === player.id);

    // Group by season
    const seasons = [...new Set(playerAwards.map((a) => a.season))];

    let potyCount = 0;
    let totyCount = 0;
    let ypotyCount = 0;

    for (const season of seasons) {
      const seasonAwards = playerAwards.filter((a) => a.season === season);
      const hasPOTY = seasonAwards.some((a) => a.type === 'POTY');
      const hasTOTY = seasonAwards.some((a) => a.type === 'TOTY');
      const hasYPOTY = seasonAwards.some((a) => a.type === 'YPOTY');

      if (hasPOTY) potyCount++;
      if (hasTOTY && !hasPOTY) totyCount++; // TOTY only counts if no POTY that season
      if (hasYPOTY) ypotyCount++;
    }

    const score = potyCount * 4 + totyCount * 2 + ypotyCount * 1;

    return { player, score, breakdown: { potyCount, totyCount, ypotyCount } };
  });
}

export function getRankedPlayers(players: Player[], awards: Award[]): PlayerScore[] {
  return calculateScores(players, awards)
    .filter((ps) => ps.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Tiebreaker: appearances
      return b.player.appearances - a.player.appearances;
    });
}
