// Award types:
// POTY  = PFA Players' Player of the Year  → 4 pts
// TOTY  = PFA Team of the Year selection   → 2 pts (not counted if POTY same season)
// YPOTY = PFA Young Player of the Year     → 1 pt

export type AwardType = 'POTY' | 'TOTY' | 'YPOTY';

export interface Award {
  playerId: string;
  season: string; // e.g. "1992-93"
  type: AwardType;
}

export const awards: Award[] = [
  // ─── PFA Player of the Year ───────────────────────────────────────────────
  { playerId: 'mcgrath',        season: '1992-93', type: 'POTY' },
  { playerId: 'cantona',        season: '1993-94', type: 'POTY' },
  { playerId: 'shearer',        season: '1994-95', type: 'POTY' },
  { playerId: 'ferdinand-l',    season: '1995-96', type: 'POTY' },
  { playerId: 'shearer',        season: '1996-97', type: 'POTY' },
  { playerId: 'bergkamp',       season: '1997-98', type: 'POTY' },
  { playerId: 'ginola',         season: '1998-99', type: 'POTY' },
  { playerId: 'keane-r',        season: '1999-00', type: 'POTY' },
  { playerId: 'sheringham',     season: '2000-01', type: 'POTY' },
  { playerId: 'van-nistelrooy', season: '2001-02', type: 'POTY' },
  { playerId: 'henry',          season: '2002-03', type: 'POTY' },
  { playerId: 'henry',          season: '2003-04', type: 'POTY' },
  { playerId: 'terry',          season: '2004-05', type: 'POTY' },
  { playerId: 'gerrard',        season: '2005-06', type: 'POTY' },
  { playerId: 'ronaldo',        season: '2006-07', type: 'POTY' },
  { playerId: 'ronaldo',        season: '2007-08', type: 'POTY' },
  { playerId: 'giggs',          season: '2008-09', type: 'POTY' },
  { playerId: 'rooney',         season: '2009-10', type: 'POTY' },
  { playerId: 'bale',           season: '2010-11', type: 'POTY' },
  { playerId: 'kompany',        season: '2011-12', type: 'POTY' },
  { playerId: 'bale',           season: '2012-13', type: 'POTY' },
  { playerId: 'suarez',         season: '2013-14', type: 'POTY' },
  { playerId: 'hazard',         season: '2014-15', type: 'POTY' },
  { playerId: 'mahrez',         season: '2015-16', type: 'POTY' },
  { playerId: 'kante',          season: '2016-17', type: 'POTY' },
  { playerId: 'salah',          season: '2017-18', type: 'POTY' },
  { playerId: 'sterling',       season: '2018-19', type: 'POTY' },
  { playerId: 'henderson',      season: '2019-20', type: 'POTY' },
  { playerId: 'dias',           season: '2020-21', type: 'POTY' },
  { playerId: 'de-bruyne',      season: '2021-22', type: 'POTY' },
  { playerId: 'haaland',        season: '2022-23', type: 'POTY' },
  { playerId: 'foden',          season: '2023-24', type: 'POTY' },
  { playerId: 'salah',          season: '2024-25', type: 'POTY' },

  // ─── PFA Young Player of the Year ─────────────────────────────────────────
  { playerId: 'giggs',    season: '1992-93', type: 'YPOTY' },
  { playerId: 'cole-a-fw', season: '1993-94', type: 'YPOTY' },
  { playerId: 'fowler',   season: '1994-95', type: 'YPOTY' },
  { playerId: 'fowler',   season: '1995-96', type: 'YPOTY' },
  { playerId: 'beckham',  season: '1996-97', type: 'YPOTY' },
  { playerId: 'owen',     season: '1997-98', type: 'YPOTY' },
  { playerId: 'anelka',   season: '1998-99', type: 'YPOTY' },
  { playerId: 'kewell',   season: '1999-00', type: 'YPOTY' },
  { playerId: 'gerrard',  season: '2000-01', type: 'YPOTY' },
  { playerId: 'bellamy',  season: '2001-02', type: 'YPOTY' },
  { playerId: 'jenas',    season: '2002-03', type: 'YPOTY' },
  { playerId: 'parker',   season: '2003-04', type: 'YPOTY' },
  { playerId: 'rooney',   season: '2004-05', type: 'YPOTY' },
  { playerId: 'fabregas', season: '2005-06', type: 'YPOTY' },
  { playerId: 'fabregas', season: '2006-07', type: 'YPOTY' },
  { playerId: 'fabregas', season: '2007-08', type: 'YPOTY' },
  { playerId: 'young-ashley', season: '2008-09', type: 'YPOTY' },
  { playerId: 'milner',   season: '2009-10', type: 'YPOTY' },
  { playerId: 'henderson', season: '2010-11', type: 'YPOTY' },
  { playerId: 'sturridge', season: '2011-12', type: 'YPOTY' },
  { playerId: 'barkley',  season: '2012-13', type: 'YPOTY' },
  { playerId: 'sterling', season: '2013-14', type: 'YPOTY' },
  { playerId: 'kane',     season: '2014-15', type: 'YPOTY' },
  { playerId: 'dele',     season: '2015-16', type: 'YPOTY' },
  { playerId: 'dele',     season: '2016-17', type: 'YPOTY' },
  { playerId: 'trent',    season: '2017-18', type: 'YPOTY' },
  { playerId: 'rashford', season: '2018-19', type: 'YPOTY' },
  { playerId: 'greenwood', season: '2019-20', type: 'YPOTY' },
  { playerId: 'saka',     season: '2020-21', type: 'YPOTY' },
  { playerId: 'saka',     season: '2021-22', type: 'YPOTY' },
  { playerId: 'saka',     season: '2022-23', type: 'YPOTY' },
  { playerId: 'palmer',        season: '2023-24', type: 'YPOTY' },
  { playerId: 'morgan-rogers', season: '2024-25', type: 'YPOTY' },

  // ─── PFA Team of the Year ─────────────────────────────────────────────────
  // 1992-93
  { playerId: 'schmeichel', season: '1992-93', type: 'TOTY' },
  { playerId: 'mcgrath',    season: '1992-93', type: 'TOTY' }, // POTY same season — excluded in scoring
  { playerId: 'adams',      season: '1992-93', type: 'TOTY' },
  { playerId: 'irwin',      season: '1992-93', type: 'TOTY' },
  { playerId: 'giggs',      season: '1992-93', type: 'TOTY' },

  // 1993-94
  { playerId: 'schmeichel', season: '1993-94', type: 'TOTY' },
  { playerId: 'irwin',      season: '1993-94', type: 'TOTY' },
  { playerId: 'adams',      season: '1993-94', type: 'TOTY' },
  { playerId: 'giggs',      season: '1993-94', type: 'TOTY' },
  { playerId: 'shearer',    season: '1993-94', type: 'TOTY' },
  { playerId: 'cole-a-fw',  season: '1993-94', type: 'TOTY' },

  // 1994-95
  { playerId: 'schmeichel', season: '1994-95', type: 'TOTY' },
  { playerId: 'shearer',    season: '1994-95', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'fowler',     season: '1994-95', type: 'TOTY' },
  { playerId: 'giggs',      season: '1994-95', type: 'TOTY' },
  { playerId: 'cole-a-fw',  season: '1994-95', type: 'TOTY' },

  // 1995-96
  { playerId: 'schmeichel', season: '1995-96', type: 'TOTY' },
  { playerId: 'neville-g',  season: '1995-96', type: 'TOTY' },
  { playerId: 'irwin',      season: '1995-96', type: 'TOTY' },
  { playerId: 'ferdinand-l', season: '1995-96', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'shearer',    season: '1995-96', type: 'TOTY' },
  { playerId: 'giggs',      season: '1995-96', type: 'TOTY' },

  // 1996-97
  { playerId: 'schmeichel', season: '1996-97', type: 'TOTY' },
  { playerId: 'neville-g',  season: '1996-97', type: 'TOTY' },
  { playerId: 'shearer',    season: '1996-97', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'giggs',      season: '1996-97', type: 'TOTY' },
  { playerId: 'beckham',    season: '1996-97', type: 'TOTY' },

  // 1997-98
  { playerId: 'seaman',     season: '1997-98', type: 'TOTY' },
  { playerId: 'adams',      season: '1997-98', type: 'TOTY' },
  { playerId: 'bergkamp',   season: '1997-98', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'neville-g',  season: '1997-98', type: 'TOTY' },
  { playerId: 'irwin',      season: '1997-98', type: 'TOTY' },

  // 1998-99
  { playerId: 'schmeichel', season: '1998-99', type: 'TOTY' },
  { playerId: 'neville-g',  season: '1998-99', type: 'TOTY' },
  { playerId: 'stam',       season: '1998-99', type: 'TOTY' },
  { playerId: 'giggs',      season: '1998-99', type: 'TOTY' },
  { playerId: 'ginola',     season: '1998-99', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'beckham',    season: '1998-99', type: 'TOTY' },

  // 1999-00
  { playerId: 'keane-r',    season: '1999-00', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'stam',       season: '1999-00', type: 'TOTY' },
  { playerId: 'neville-g',  season: '1999-00', type: 'TOTY' },
  { playerId: 'giggs',      season: '1999-00', type: 'TOTY' },

  // 2000-01
  { playerId: 'henry',      season: '2000-01', type: 'TOTY' },
  { playerId: 'sheringham', season: '2000-01', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'vieira',     season: '2000-01', type: 'TOTY' },
  { playerId: 'keane-r',    season: '2000-01', type: 'TOTY' },

  // 2001-02
  { playerId: 'van-nistelrooy', season: '2001-02', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'henry',      season: '2001-02', type: 'TOTY' },
  { playerId: 'vieira',     season: '2001-02', type: 'TOTY' },
  { playerId: 'keane-r',    season: '2001-02', type: 'TOTY' },
  { playerId: 'cole-a',     season: '2001-02', type: 'TOTY' },
  { playerId: 'campbell',   season: '2001-02', type: 'TOTY' },

  // 2002-03
  { playerId: 'henry',      season: '2002-03', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'vieira',     season: '2002-03', type: 'TOTY' },
  { playerId: 'van-nistelrooy', season: '2002-03', type: 'TOTY' },
  { playerId: 'keane-r',    season: '2002-03', type: 'TOTY' },
  { playerId: 'neville-g',  season: '2002-03', type: 'TOTY' },
  { playerId: 'scholes',    season: '2002-03', type: 'TOTY' },
  { playerId: 'giggs',      season: '2002-03', type: 'TOTY' },

  // 2003-04
  { playerId: 'henry',      season: '2003-04', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'vieira',     season: '2003-04', type: 'TOTY' },
  { playerId: 'cole-a',     season: '2003-04', type: 'TOTY' },
  { playerId: 'terry',      season: '2003-04', type: 'TOTY' },
  { playerId: 'bergkamp',   season: '2003-04', type: 'TOTY' },
  { playerId: 'lampard',    season: '2003-04', type: 'TOTY' },

  // 2004-05
  { playerId: 'terry',      season: '2004-05', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'cole-a',     season: '2004-05', type: 'TOTY' },
  { playerId: 'lampard',    season: '2004-05', type: 'TOTY' },
  { playerId: 'vieira',     season: '2004-05', type: 'TOTY' },
  { playerId: 'drogba',     season: '2004-05', type: 'TOTY' },

  // 2005-06
  { playerId: 'gerrard',    season: '2005-06', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'terry',      season: '2005-06', type: 'TOTY' },
  { playerId: 'cole-a',     season: '2005-06', type: 'TOTY' },
  { playerId: 'lampard',    season: '2005-06', type: 'TOTY' },
  { playerId: 'ferdinand',  season: '2005-06', type: 'TOTY' },

  // 2006-07
  { playerId: 'ronaldo',    season: '2006-07', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'lampard',    season: '2006-07', type: 'TOTY' },
  { playerId: 'terry',      season: '2006-07', type: 'TOTY' },
  { playerId: 'cole-a',     season: '2006-07', type: 'TOTY' },
  { playerId: 'ferdinand',  season: '2006-07', type: 'TOTY' },
  { playerId: 'scholes',    season: '2006-07', type: 'TOTY' },

  // 2007-08
  { playerId: 'ronaldo',    season: '2007-08', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'lampard',    season: '2007-08', type: 'TOTY' },
  { playerId: 'terry',      season: '2007-08', type: 'TOTY' },
  { playerId: 'cole-a',     season: '2007-08', type: 'TOTY' },
  { playerId: 'ferdinand',  season: '2007-08', type: 'TOTY' },
  { playerId: 'vidic',      season: '2007-08', type: 'TOTY' },

  // 2008-09
  { playerId: 'giggs',      season: '2008-09', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'vidic',      season: '2008-09', type: 'TOTY' },
  { playerId: 'ferdinand',  season: '2008-09', type: 'TOTY' },
  { playerId: 'cole-a',     season: '2008-09', type: 'TOTY' },
  { playerId: 'lampard',    season: '2008-09', type: 'TOTY' },

  // 2009-10
  { playerId: 'rooney',     season: '2009-10', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'vidic',      season: '2009-10', type: 'TOTY' },
  { playerId: 'lampard',    season: '2009-10', type: 'TOTY' },
  { playerId: 'terry',      season: '2009-10', type: 'TOTY' },
  { playerId: 'cole-a',     season: '2009-10', type: 'TOTY' },

  // 2010-11
  { playerId: 'bale',       season: '2010-11', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'vidic',      season: '2010-11', type: 'TOTY' },
  { playerId: 'rooney',     season: '2010-11', type: 'TOTY' },
  { playerId: 'lampard',    season: '2010-11', type: 'TOTY' },
  { playerId: 'neville-g',  season: '2010-11', type: 'TOTY' },

  // 2011-12
  { playerId: 'kompany',    season: '2011-12', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'aguero',     season: '2011-12', type: 'TOTY' },
  { playerId: 'de-bruyne',  season: '2011-12', type: 'TOTY' },
  { playerId: 'silva-d',    season: '2011-12', type: 'TOTY' },
  { playerId: 'rooney',     season: '2011-12', type: 'TOTY' },
  { playerId: 'toure-y',    season: '2011-12', type: 'TOTY' },
  { playerId: 'neville-g',  season: '2011-12', type: 'TOTY' },

  // 2012-13
  { playerId: 'bale',       season: '2012-13', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'van-persie', season: '2012-13', type: 'TOTY' },
  { playerId: 'rooney',     season: '2012-13', type: 'TOTY' },
  { playerId: 'lampard',    season: '2012-13', type: 'TOTY' },
  { playerId: 'kompany',    season: '2012-13', type: 'TOTY' },

  // 2013-14
  { playerId: 'suarez',     season: '2013-14', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'gerrard',    season: '2013-14', type: 'TOTY' },
  { playerId: 'kompany',    season: '2013-14', type: 'TOTY' },
  { playerId: 'toure-y',    season: '2013-14', type: 'TOTY' },
  { playerId: 'silva-d',    season: '2013-14', type: 'TOTY' },
  { playerId: 'aguero',     season: '2013-14', type: 'TOTY' },

  // 2014-15
  { playerId: 'hazard',     season: '2014-15', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'aguero',     season: '2014-15', type: 'TOTY' },
  { playerId: 'silva-d',    season: '2014-15', type: 'TOTY' },
  { playerId: 'terry',      season: '2014-15', type: 'TOTY' },
  { playerId: 'de-bruyne',  season: '2014-15', type: 'TOTY' },

  // 2015-16
  { playerId: 'mahrez',     season: '2015-16', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'kante',      season: '2015-16', type: 'TOTY' },
  { playerId: 'aguero',     season: '2015-16', type: 'TOTY' },
  { playerId: 'de-bruyne',  season: '2015-16', type: 'TOTY' },
  { playerId: 'hazard',     season: '2015-16', type: 'TOTY' },

  // 2016-17
  { playerId: 'kante',      season: '2016-17', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'de-bruyne',  season: '2016-17', type: 'TOTY' },
  { playerId: 'hazard',     season: '2016-17', type: 'TOTY' },
  { playerId: 'aguero',     season: '2016-17', type: 'TOTY' },
  { playerId: 'silva-d',    season: '2016-17', type: 'TOTY' },

  // 2017-18
  { playerId: 'salah',      season: '2017-18', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'de-bruyne',  season: '2017-18', type: 'TOTY' },
  { playerId: 'silva-d',    season: '2017-18', type: 'TOTY' },
  { playerId: 'aguero',     season: '2017-18', type: 'TOTY' },
  { playerId: 'trent',      season: '2017-18', type: 'TOTY' },

  // 2018-19
  { playerId: 'sterling',   season: '2018-19', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'salah',      season: '2018-19', type: 'TOTY' },
  { playerId: 'de-bruyne',  season: '2018-19', type: 'TOTY' },
  { playerId: 'van-dijk',   season: '2018-19', type: 'TOTY' },
  { playerId: 'robertson',  season: '2018-19', type: 'TOTY' },
  { playerId: 'trent',      season: '2018-19', type: 'TOTY' },
  { playerId: 'alisson',    season: '2018-19', type: 'TOTY' },

  // 2019-20
  { playerId: 'henderson',  season: '2019-20', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'salah',      season: '2019-20', type: 'TOTY' },
  { playerId: 'de-bruyne',  season: '2019-20', type: 'TOTY' },
  { playerId: 'van-dijk',   season: '2019-20', type: 'TOTY' },
  { playerId: 'robertson',  season: '2019-20', type: 'TOTY' },
  { playerId: 'trent',      season: '2019-20', type: 'TOTY' },
  { playerId: 'alisson',    season: '2019-20', type: 'TOTY' },

  // 2020-21
  { playerId: 'dias',       season: '2020-21', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'salah',      season: '2020-21', type: 'TOTY' },
  { playerId: 'de-bruyne',  season: '2020-21', type: 'TOTY' },
  { playerId: 'robertson',  season: '2020-21', type: 'TOTY' },
  { playerId: 'trent',      season: '2020-21', type: 'TOTY' },
  { playerId: 'ederson',    season: '2020-21', type: 'TOTY' },

  // 2021-22
  { playerId: 'de-bruyne',  season: '2021-22', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'salah',      season: '2021-22', type: 'TOTY' },
  { playerId: 'dias',       season: '2021-22', type: 'TOTY' },
  { playerId: 'robertson',  season: '2021-22', type: 'TOTY' },
  { playerId: 'trent',      season: '2021-22', type: 'TOTY' },
  { playerId: 'alisson',    season: '2021-22', type: 'TOTY' },

  // 2022-23
  { playerId: 'haaland',    season: '2022-23', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'salah',      season: '2022-23', type: 'TOTY' },
  { playerId: 'de-bruyne',  season: '2022-23', type: 'TOTY' },
  { playerId: 'foden',      season: '2022-23', type: 'TOTY' },
  { playerId: 'dias',       season: '2022-23', type: 'TOTY' },
  { playerId: 'trent',      season: '2022-23', type: 'TOTY' },
  { playerId: 'ederson',    season: '2022-23', type: 'TOTY' },

  // 2023-24
  { playerId: 'foden',      season: '2023-24', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'salah',      season: '2023-24', type: 'TOTY' },
  { playerId: 'de-bruyne',  season: '2023-24', type: 'TOTY' },
  { playerId: 'trent',      season: '2023-24', type: 'TOTY' },
  { playerId: 'dias',       season: '2023-24', type: 'TOTY' },

  // 2024-25
  { playerId: 'sels',          season: '2024-25', type: 'TOTY' },
  { playerId: 'van-dijk',      season: '2024-25', type: 'TOTY' },
  { playerId: 'saliba',        season: '2024-25', type: 'TOTY' },
  { playerId: 'gabriel',       season: '2024-25', type: 'TOTY' },
  { playerId: 'kerkez',        season: '2024-25', type: 'TOTY' },
  { playerId: 'gravenberch',   season: '2024-25', type: 'TOTY' },
  { playerId: 'rice',          season: '2024-25', type: 'TOTY' },
  { playerId: 'mac-allister',  season: '2024-25', type: 'TOTY' },
  { playerId: 'salah',         season: '2024-25', type: 'TOTY' }, // POTY same season — excluded
  { playerId: 'wood',          season: '2024-25', type: 'TOTY' },
  { playerId: 'isak',          season: '2024-25', type: 'TOTY' },
];
