import { describe, it, expect } from 'vitest';
import { players } from './players';
import { awards } from './awards';
import { wslPlayers } from './wsl-players';
import { wslAwards } from './wsl-awards';

describe('data integrity', () => {
  it('every award playerId has a matching player entry', () => {
    const playerIds = new Set(players.map(p => p.id));
    const orphaned = [...new Set(awards.map(a => a.playerId))].filter(id => !playerIds.has(id));
    expect(orphaned).toEqual([]);
  });

  it('all player ids are unique', () => {
    const ids = players.map(p => p.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates).toEqual([]);
  });

  it('all award seasons follow the YYYY-YY format', () => {
    const invalid = awards.filter(a => !/^\d{4}-\d{2}$/.test(a.season));
    expect(invalid).toEqual([]);
  });

  it('all award types are valid', () => {
    const validTypes = new Set(['POTY', 'TOTY', 'YPOTY']);
    const invalid = awards.filter(a => !validTypes.has(a.type));
    expect(invalid).toEqual([]);
  });

  it('no player has more than one POTY in the same season', () => {
    const potyAwards = awards.filter(a => a.type === 'POTY');
    const seen = new Set<string>();
    const duplicates: typeof potyAwards = [];
    for (const a of potyAwards) {
      const key = `${a.playerId}:${a.season}`;
      if (seen.has(key)) duplicates.push(a);
      seen.add(key);
    }
    expect(duplicates).toEqual([]);
  });

  it('every season has exactly one POTY winner', () => {
    const seasons = [...new Set(awards.map(a => a.season))];
    const badSeasons = seasons.filter(season => {
      const count = awards.filter(a => a.season === season && a.type === 'POTY').length;
      return count !== 1;
    });
    expect(badSeasons).toEqual([]);
  });

  it('every season has exactly one YPOTY winner', () => {
    const seasons = [...new Set(awards.map(a => a.season))];
    const badSeasons = seasons.filter(season => {
      const count = awards.filter(a => a.season === season && a.type === 'YPOTY').length;
      return count !== 1;
    });
    expect(badSeasons).toEqual([]);
  });

  it('every player has a non-empty name', () => {
    const blank = players.filter(p => !p.name.trim());
    expect(blank).toEqual([]);
  });

  it('all award entries have a non-empty club field', () => {
    const missing = awards.filter(a => !a.club || !a.club.trim());
    expect(missing).toEqual([]);
  });
});

describe('WSL data integrity', () => {
  // The women's awards started at different times: POTY from 2012-13,
  // YPOTY and TOTY only from 2013-14.
  const FIRST_YPOTY_SEASON = '2013-14';

  it('every award playerId has a matching player entry', () => {
    const playerIds = new Set(wslPlayers.map(p => p.id));
    const orphaned = [...new Set(wslAwards.map(a => a.playerId))].filter(id => !playerIds.has(id));
    expect(orphaned).toEqual([]);
  });

  it('all player ids are unique', () => {
    const ids = wslPlayers.map(p => p.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates).toEqual([]);
  });

  it('all award seasons follow the YYYY-YY format', () => {
    const invalid = wslAwards.filter(a => !/^\d{4}-\d{2}$/.test(a.season));
    expect(invalid).toEqual([]);
  });

  it('all award types are valid', () => {
    const validTypes = new Set(['POTY', 'TOTY', 'YPOTY']);
    const invalid = wslAwards.filter(a => !validTypes.has(a.type));
    expect(invalid).toEqual([]);
  });

  it('every season has exactly one POTY winner', () => {
    const seasons = [...new Set(wslAwards.map(a => a.season))];
    const badSeasons = seasons.filter(season => {
      const count = wslAwards.filter(a => a.season === season && a.type === 'POTY').length;
      return count !== 1;
    });
    expect(badSeasons).toEqual([]);
  });

  it('every season from 2013-14 onwards has exactly one YPOTY winner', () => {
    const seasons = [...new Set(wslAwards.map(a => a.season))].filter(s => s >= FIRST_YPOTY_SEASON);
    const badSeasons = seasons.filter(season => {
      const count = wslAwards.filter(a => a.season === season && a.type === 'YPOTY').length;
      return count !== 1;
    });
    expect(badSeasons).toEqual([]);
  });

  it('every player has a non-empty name', () => {
    const blank = wslPlayers.filter(p => !p.name.trim());
    expect(blank).toEqual([]);
  });

  it('all award entries have a non-empty club field', () => {
    const missing = wslAwards.filter(a => !a.club || !a.club.trim());
    expect(missing).toEqual([]);
  });
});
