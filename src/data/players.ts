export type Position = 'GK' | 'RB' | 'CB' | 'LB' | 'CM' | 'CDM' | 'CAM' | 'RW' | 'LW' | 'ST';

export interface Player {
  id: string;
  name: string;
  position: Position;
  nationality: string;
  clubs: string[];
  appearances: number; // total PL appearances (tiebreaker)
  image?: string;
}

export const players: Player[] = [
  // Goalkeepers
  { id: 'schmeichel', name: 'Peter Schmeichel', position: 'GK', nationality: 'Danish', clubs: ['Manchester United', 'Aston Villa', 'Manchester City'], appearances: 310 },
  { id: 'seaman', name: 'David Seaman', position: 'GK', nationality: 'English', clubs: ['Arsenal', 'Manchester City'], appearances: 344 },
  { id: 'james', name: 'David James', position: 'GK', nationality: 'English', clubs: ['Liverpool', 'Aston Villa', 'West Ham', 'Manchester City', 'Portsmouth'], appearances: 572 },
  { id: 'reina', name: 'Pepe Reina', position: 'GK', nationality: 'Spanish', clubs: ['Liverpool'], appearances: 285 },
  { id: 'de-gea', name: 'David de Gea', position: 'GK', nationality: 'Spanish', clubs: ['Manchester United'], appearances: 395 },
  { id: 'alisson', name: 'Alisson', position: 'GK', nationality: 'Brazilian', clubs: ['Liverpool'], appearances: 243 },
  { id: 'ederson', name: 'Ederson', position: 'GK', nationality: 'Brazilian', clubs: ['Manchester City'], appearances: 280 },

  // Right Backs
  { id: 'neville-g', name: 'Gary Neville', position: 'RB', nationality: 'English', clubs: ['Manchester United'], appearances: 400 },
  { id: 'trent', name: 'Trent Alexander-Arnold', position: 'RB', nationality: 'English', clubs: ['Liverpool'], appearances: 248 },
  { id: 'cafu', name: 'Cafu', position: 'RB', nationality: 'Brazilian', clubs: ['AS Roma'], appearances: 0 },

  // Centre Backs
  { id: 'terry', name: 'John Terry', position: 'CB', nationality: 'English', clubs: ['Chelsea', 'Aston Villa'], appearances: 492 },
  { id: 'ferdinand', name: 'Rio Ferdinand', position: 'CB', nationality: 'English', clubs: ['Leeds United', 'Manchester United', 'QPR'], appearances: 455 },
  { id: 'vidic', name: 'Nemanja Vidic', position: 'CB', nationality: 'Serbian', clubs: ['Manchester United'], appearances: 211 },
  { id: 'kompany', name: 'Vincent Kompany', position: 'CB', nationality: 'Belgian', clubs: ['Manchester City'], appearances: 265 },
  { id: 'van-dijk', name: 'Virgil van Dijk', position: 'CB', nationality: 'Dutch', clubs: ['Southampton', 'Liverpool'], appearances: 280 },
  { id: 'stam', name: 'Jaap Stam', position: 'CB', nationality: 'Dutch', clubs: ['Manchester United'], appearances: 127 },
  { id: 'adams', name: 'Tony Adams', position: 'CB', nationality: 'English', clubs: ['Arsenal'], appearances: 255 },

  // Left Backs
  { id: 'cole-a', name: 'Ashley Cole', position: 'LB', nationality: 'English', clubs: ['Arsenal', 'Chelsea'], appearances: 385 },
  { id: 'irwin', name: 'Denis Irwin', position: 'LB', nationality: 'Irish', clubs: ['Manchester United'], appearances: 368 },
  { id: 'robertson', name: 'Andrew Robertson', position: 'LB', nationality: 'Scottish', clubs: ['Hull City', 'Liverpool'], appearances: 290 },
  { id: 'sagna', name: 'Bacary Sagna', position: 'RB', nationality: 'French', clubs: ['Arsenal', 'Manchester City'], appearances: 284 },

  // Central/Defensive Midfielders
  { id: 'keane-r', name: 'Roy Keane', position: 'CDM', nationality: 'Irish', clubs: ['Nottingham Forest', 'Manchester United'], appearances: 366 },
  { id: 'vieira', name: 'Patrick Vieira', position: 'CDM', nationality: 'French', clubs: ['Arsenal', 'Manchester City'], appearances: 307 },
  { id: 'kante', name: "N'Golo Kante", position: 'CDM', nationality: 'French', clubs: ['Leicester City', 'Chelsea'], appearances: 245 },
  { id: 'lampard', name: 'Frank Lampard', position: 'CM', nationality: 'English', clubs: ['West Ham', 'Chelsea', 'Manchester City'], appearances: 609 },
  { id: 'gerrard', name: 'Steven Gerrard', position: 'CM', nationality: 'English', clubs: ['Liverpool'], appearances: 504 },
  { id: 'scholes', name: 'Paul Scholes', position: 'CM', nationality: 'English', clubs: ['Manchester United'], appearances: 499 },
  { id: 'de-bruyne', name: 'Kevin De Bruyne', position: 'CM', nationality: 'Belgian', clubs: ['Chelsea', 'Manchester City'], appearances: 308 },
  { id: 'barry', name: 'Gareth Barry', position: 'CM', nationality: 'English', clubs: ['Aston Villa', 'Manchester City', 'Everton', 'West Brom'], appearances: 653 },

  // Attacking Midfielders / Wingers
  { id: 'giggs', name: 'Ryan Giggs', position: 'LW', nationality: 'Welsh', clubs: ['Manchester United'], appearances: 632 },
  { id: 'beckham', name: 'David Beckham', position: 'RW', nationality: 'English', clubs: ['Manchester United'], appearances: 265 },
  { id: 'bergkamp', name: 'Dennis Bergkamp', position: 'CAM', nationality: 'Dutch', clubs: ['Arsenal'], appearances: 315 },
  { id: 'hazard', name: 'Eden Hazard', position: 'LW', nationality: 'Belgian', clubs: ['Chelsea'], appearances: 245 },
  { id: 'mahrez', name: 'Riyad Mahrez', position: 'RW', nationality: 'Algerian', clubs: ['Leicester City', 'Manchester City'], appearances: 287 },
  { id: 'salah', name: 'Mohamed Salah', position: 'RW', nationality: 'Egyptian', clubs: ['Chelsea', 'Liverpool'], appearances: 310 },
  { id: 'sterling', name: 'Raheem Sterling', position: 'LW', nationality: 'English', clubs: ['Liverpool', 'Manchester City', 'Chelsea'], appearances: 390 },
  { id: 'ginola', name: 'David Ginola', position: 'LW', nationality: 'French', clubs: ['Newcastle', 'Tottenham', 'Aston Villa', 'Everton'], appearances: 228 },

  // Forwards / Strikers
  { id: 'henry', name: 'Thierry Henry', position: 'ST', nationality: 'French', clubs: ['Arsenal'], appearances: 258 },
  { id: 'shearer', name: 'Alan Shearer', position: 'ST', nationality: 'English', clubs: ['Blackburn Rovers', 'Newcastle United'], appearances: 441 },
  { id: 'rooney', name: 'Wayne Rooney', position: 'ST', nationality: 'English', clubs: ['Everton', 'Manchester United'], appearances: 491 },
  { id: 'van-nistelrooy', name: 'Ruud van Nistelrooy', position: 'ST', nationality: 'Dutch', clubs: ['Manchester United'], appearances: 150 },
  { id: 'suarez', name: 'Luis Suarez', position: 'ST', nationality: 'Uruguayan', clubs: ['Liverpool'], appearances: 133 },
  { id: 'aguero', name: 'Sergio Aguero', position: 'ST', nationality: 'Argentinian', clubs: ['Manchester City'], appearances: 275 },
  { id: 'ronaldo', name: 'Cristiano Ronaldo', position: 'LW', nationality: 'Portuguese', clubs: ['Manchester United'], appearances: 236 },
  { id: 'haaland', name: 'Erling Haaland', position: 'ST', nationality: 'Norwegian', clubs: ['Manchester City'], appearances: 105 },
  { id: 'fowler', name: 'Robbie Fowler', position: 'ST', nationality: 'English', clubs: ['Liverpool', 'Leeds', 'Manchester City', 'Blackburn'], appearances: 379 },
  { id: 'cole-a-fw', name: 'Andrew Cole', position: 'ST', nationality: 'English', clubs: ['Newcastle', 'Manchester United', 'Blackburn', 'Fulham', 'Manchester City'], appearances: 414 },
  { id: 'ferdinand-l', name: 'Les Ferdinand', position: 'ST', nationality: 'English', clubs: ['QPR', 'Newcastle', 'Tottenham', 'West Ham', 'Leicester', 'Bolton'], appearances: 351 },
  { id: 'sheringham', name: 'Teddy Sheringham', position: 'ST', nationality: 'English', clubs: ['Nottingham Forest', 'Tottenham', 'Manchester United', 'Portsmouth', 'West Ham'], appearances: 418 },
  { id: 'drogba', name: 'Didier Drogba', position: 'ST', nationality: 'Ivorian', clubs: ['Chelsea'], appearances: 254 },
  { id: 'mcgrath', name: 'Paul McGrath', position: 'CB', nationality: 'Irish', clubs: ['Manchester United', 'Aston Villa', 'Derby'], appearances: 196 },
  { id: 'bale', name: 'Gareth Bale', position: 'LW', nationality: 'Welsh', clubs: ['Southampton', 'Tottenham'], appearances: 146 },
  { id: 'foden', name: 'Phil Foden', position: 'CM', nationality: 'English', clubs: ['Manchester City'], appearances: 250 },
  { id: 'dias', name: 'Rúben Dias', position: 'CB', nationality: 'Portuguese', clubs: ['Manchester City'], appearances: 175 },
  { id: 'henderson', name: 'Jordan Henderson', position: 'CM', nationality: 'English', clubs: ['Sunderland', 'Liverpool'], appearances: 408 },
  { id: 'young-ashley', name: 'Ashley Young', position: 'LW', nationality: 'English', clubs: ['Watford', 'Aston Villa', 'Manchester United', 'Inter Milan'], appearances: 391 },
  { id: 'milner', name: 'James Milner', position: 'CM', nationality: 'English', clubs: ['Leeds', 'Newcastle', 'Aston Villa', 'Manchester City', 'Liverpool'], appearances: 574 },
  { id: 'owen', name: 'Michael Owen', position: 'ST', nationality: 'English', clubs: ['Liverpool', 'Newcastle', 'Manchester United'], appearances: 326 },
  { id: 'anelka', name: 'Nicolas Anelka', position: 'ST', nationality: 'French', clubs: ['Arsenal', 'Liverpool', 'Manchester City', 'Bolton', 'Chelsea', 'West Brom'], appearances: 364 },
  { id: 'fabregas', name: 'Cesc Fabregas', position: 'CAM', nationality: 'Spanish', clubs: ['Arsenal', 'Chelsea'], appearances: 350 },
  { id: 'silva-d', name: 'David Silva', position: 'CAM', nationality: 'Spanish', clubs: ['Manchester City'], appearances: 436 },
  { id: 'toure-y', name: 'Yaya Toure', position: 'CM', nationality: 'Ivorian', clubs: ['Manchester City'], appearances: 230 },
  { id: 'park', name: 'Ji-Sung Park', position: 'CM', nationality: 'South Korean', clubs: ['Manchester United'], appearances: 134 },
  { id: 'kewell', name: 'Harry Kewell', position: 'LW', nationality: 'Australian', clubs: ['Leeds', 'Liverpool'], appearances: 186 },
  { id: 'bellamy', name: 'Craig Bellamy', position: 'ST', nationality: 'Welsh', clubs: ['Coventry', 'Newcastle', 'Blackburn', 'Liverpool', 'West Ham', 'Manchester City', 'Cardiff'], appearances: 315 },

  // Players referenced in awards but previously missing
  { id: 'cantona',    name: 'Eric Cantona',      position: 'ST',  nationality: 'French',   clubs: ['Leeds United', 'Manchester United'], appearances: 156 },
  { id: 'campbell',   name: 'Sol Campbell',       position: 'CB',  nationality: 'English',  clubs: ['Tottenham', 'Arsenal', 'Portsmouth', 'Newcastle'], appearances: 315 },
  { id: 'van-persie', name: 'Robin van Persie',   position: 'ST',  nationality: 'Dutch',    clubs: ['Arsenal', 'Manchester United'], appearances: 280 },
  { id: 'jenas',      name: 'Jermaine Jenas',     position: 'CM',  nationality: 'English',  clubs: ['Newcastle', 'Tottenham'], appearances: 245 },
  { id: 'parker',     name: 'Scott Parker',        position: 'CM',  nationality: 'English',  clubs: ['Charlton', 'Chelsea', 'Newcastle', 'West Ham', 'Tottenham', 'Fulham'], appearances: 370 },
  { id: 'sturridge',  name: 'Daniel Sturridge',   position: 'ST',  nationality: 'English',  clubs: ['Manchester City', 'Chelsea', 'Liverpool', 'West Brom'], appearances: 176 },
  { id: 'barkley',    name: 'Ross Barkley',        position: 'CAM', nationality: 'English',  clubs: ['Everton', 'Chelsea', 'Aston Villa'], appearances: 270 },
  { id: 'kane',       name: 'Harry Kane',          position: 'ST',  nationality: 'English',  clubs: ['Tottenham'], appearances: 320 },
  { id: 'dele',       name: 'Dele Alli',           position: 'CAM', nationality: 'English',  clubs: ['Tottenham', 'Everton'], appearances: 213 },
  { id: 'rashford',   name: 'Marcus Rashford',     position: 'LW',  nationality: 'English',  clubs: ['Manchester United'], appearances: 270 },
  { id: 'greenwood',  name: 'Mason Greenwood',     position: 'ST',  nationality: 'English',  clubs: ['Manchester United'], appearances: 129 },
  { id: 'saka',       name: 'Bukayo Saka',         position: 'RW',  nationality: 'English',  clubs: ['Arsenal'], appearances: 215 },
  { id: 'palmer',     name: 'Cole Palmer',         position: 'CAM', nationality: 'English',  clubs: ['Manchester City', 'Chelsea'], appearances: 110 },

  // 2024-25 season additions
  { id: 'sels',          name: 'Matz Sels',           position: 'GK',  nationality: 'Belgian',        clubs: ['Nottingham Forest'], appearances: 100 },
  { id: 'saliba',        name: 'William Saliba',       position: 'CB',  nationality: 'French',         clubs: ['Arsenal'], appearances: 110 },
  { id: 'gabriel',       name: 'Gabriel Magalhães',    position: 'CB',  nationality: 'Brazilian',      clubs: ['Arsenal'], appearances: 155 },
  { id: 'kerkez',        name: 'Milos Kerkez',         position: 'LB',  nationality: 'Hungarian',      clubs: ['Bournemouth'], appearances: 80 },
  { id: 'gravenberch',   name: 'Ryan Gravenberch',     position: 'CDM', nationality: 'Dutch',          clubs: ['Liverpool'], appearances: 80 },
  { id: 'rice',          name: 'Declan Rice',          position: 'CDM', nationality: 'English',        clubs: ['West Ham United', 'Arsenal'], appearances: 200 },
  { id: 'mac-allister',  name: 'Alexis Mac Allister',  position: 'CM',  nationality: 'Argentinian',    clubs: ['Brighton', 'Liverpool'], appearances: 175 },
  { id: 'isak',          name: 'Alexander Isak',       position: 'ST',  nationality: 'Swedish',        clubs: ['Newcastle United'], appearances: 110 },
  { id: 'wood',          name: 'Chris Wood',           position: 'ST',  nationality: 'New Zealander',  clubs: ['Burnley', 'Newcastle United', 'Nottingham Forest'], appearances: 300 },
  { id: 'morgan-rogers', name: 'Morgan Rogers',        position: 'LW',  nationality: 'English',        clubs: ['Aston Villa'], appearances: 120 },
];
