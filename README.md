# Best of the Premier League

A React app that ranks the greatest Premier League players of all time using PFA award data, and selects an all-time Best XI.

## Scoring System

| Award | Points | Notes |
|---|---|---|
| PFA Players' Player of the Year (POTY) | 3 pts | Per season won |
| PFA Team of the Year (TOTY) | 1 pt | Per season won |
| PFA Young Player of the Year (YPOTY) | 1 pt | Per season won |

**Tiebreakers** (in order):
1. Total number of PFA Player of the Year (POTY) wins.
2. Total number of PFA Young Player of the Year (YPOTY) wins.
3. If still equal, players share the same rank.

Data covers the full Premier League era: 1992–93 to 2024–25.

## Features

- **Top 10 leaderboard** — ranked by points with per-player award breakdown
- **Best XI** — auto-selected 4-3-3 using the highest-scoring eligible player per position slot

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## PFA Awards History (Premier League Era)

### PFA Players' Player of the Year
| Year | Player | Team |
| :--- | :--- | :--- |
| 1992–93 | Paul McGrath | Aston Villa |
| 1993–94 | Eric Cantona | Manchester United |
| 1994–95 | Alan Shearer | Blackburn Rovers |
| 1995–96 | Les Ferdinand | Newcastle United |
| 1996–97 | Alan Shearer | Newcastle United |
| 1997–98 | Dennis Bergkamp | Arsenal |
| 1998–99 | David Ginola | Tottenham Hotspur |
| 1999–00 | Roy Keane | Manchester United |
| 2000–01 | Teddy Sheringham | Manchester United |
| 2001–02 | Ruud van Nistelrooy | Manchester United |
| 2002–03 | Thierry Henry | Arsenal |
| 2003–04 | Thierry Henry | Arsenal |
| 2004–05 | John Terry | Chelsea |
| 2005–06 | Steven Gerrard | Liverpool |
| 2006–07 | Cristiano Ronaldo | Manchester United |
| 2007–08 | Cristiano Ronaldo | Manchester United |
| 2008–09 | Ryan Giggs | Manchester United |
| 2009–10 | Wayne Rooney | Manchester United |
| 2010–11 | Gareth Bale | Tottenham Hotspur |
| 2011–12 | Robin van Persie | Arsenal |
| 2012–13 | Gareth Bale | Tottenham Hotspur |
| 2013–14 | Luis Suárez | Liverpool |
| 2014–15 | Eden Hazard | Chelsea |
| 2015–16 | Riyad Mahrez | Leicester City |
| 2016–17 | N'Golo Kanté | Chelsea |
| 2017–18 | Mohamed Salah | Liverpool |
| 2018–19 | Virgil van Dijk | Liverpool |
| 2019–20 | Kevin De Bruyne | Manchester City |
| 2020–21 | Kevin De Bruyne | Manchester City |
| 2021–22 | Mohamed Salah | Liverpool |
| 2022–23 | Erling Haaland | Manchester City |
| 2023–24 | Phil Foden | Manchester City |
| 2024–25 | Mohamed Salah | Liverpool |

### PFA Young Player of the Year
| Year | Player | Team |
| :--- | :--- | :--- |
| 1992–93 | Ryan Giggs | Manchester United |
| 1993–94 | Andy Cole | Newcastle United |
| 1994–95 | Robbie Fowler | Liverpool |
| 1995–96 | Robbie Fowler | Liverpool |
| 1996–97 | David Beckham | Manchester United |
| 1997–98 | Michael Owen | Liverpool |
| 1998–99 | Nicolas Anelka | Arsenal |
| 1999–00 | Harry Kewell | Leeds United |
| 2000–01 | Steven Gerrard | Liverpool |
| 2001–02 | Craig Bellamy | Newcastle United |
| 2002–03 | Jermaine Jenas | Newcastle United |
| 2003–04 | Scott Parker | Charlton Athletic/Chelsea |
| 2004–05 | Wayne Rooney | Manchester United |
| 2005–06 | Wayne Rooney | Manchester United |
| 2006–07 | Cristiano Ronaldo | Manchester United |
| 2007–08 | Cesc Fàbregas | Arsenal |
| 2008–09 | Ashley Young | Aston Villa |
| 2009–10 | James Milner | Aston Villa |
| 2010–11 | Jack Wilshere | Arsenal |
| 2011–12 | Kyle Walker | Tottenham Hotspur |
| 2012–13 | Gareth Bale | Tottenham Hotspur |
| 2013–14 | Eden Hazard | Chelsea |
| 2014–15 | Harry Kane | Tottenham Hotspur |
| 2015–16 | Dele Alli | Tottenham Hotspur |
| 2016–17 | Dele Alli | Tottenham Hotspur |
| 2017–18 | Leroy Sané | Manchester City |
| 2018–19 | Raheem Sterling | Manchester City |
| 2019–20 | Trent Alexander-Arnold | Liverpool |
| 2020–21 | Phil Foden | Manchester City |
| 2021–22 | Phil Foden | Manchester City |
| 2022–23 | Bukayo Saka | Arsenal |
| 2023–24 | Cole Palmer | Chelsea |
| 2024–25 | Morgan Rogers | Aston Villa |

### PFA Team of the Year (Premier League)

**2024–25**
- GK: Matz Sels (Nottingham Forest)
- DF: William Saliba (Arsenal), Gabriel (Arsenal), Virgil van Dijk (Liverpool), Milos Kerkez (Bournemouth)
- MF: Alexis Mac Allister (Liverpool), Ryan Gravenberch (Liverpool), Declan Rice (Arsenal)
- FW: Mohamed Salah (Liverpool), Alexander Isak (Newcastle United), Chris Wood (Nottingham Forest)

**2023–24**
- GK: David Raya (Arsenal)
- DF: Kyle Walker (Manchester City), Gabriel (Arsenal), Virgil van Dijk (Liverpool), William Saliba (Arsenal)
- MF: Martin Ødegaard (Arsenal), Declan Rice (Arsenal), Rodri (Manchester City)
- FW: Ollie Watkins (Aston Villa), Phil Foden (Manchester City), Erling Haaland (Manchester City)

**2022–23**
- GK: Aaron Ramsdale (Arsenal)
- DF: Kieran Trippier (Newcastle United), William Saliba (Arsenal), Rúben Dias (Manchester City), John Stones (Manchester City)
- MF: Martin Ødegaard (Arsenal), Rodri (Manchester City), Kevin De Bruyne (Manchester City)
- FW: Bukayo Saka (Arsenal), Erling Haaland (Manchester City), Harry Kane (Tottenham Hotspur)

**2021–22**
- GK: Alisson (Liverpool)
- DF: Trent Alexander-Arnold (Liverpool), Virgil van Dijk (Liverpool), Antonio Rüdiger (Chelsea), João Cancelo (Manchester City)
- MF: Bernardo Silva (Manchester City), Thiago (Liverpool), Kevin De Bruyne (Manchester City)
- FW: Sadio Mané (Liverpool), Cristiano Ronaldo (Manchester United), Mohamed Salah (Liverpool)

**2020–21**
- GK: Ederson (Manchester City)
- DF: João Cancelo (Manchester City), John Stones (Manchester City), Rúben Dias (Manchester City), Luke Shaw (Manchester United)
- MF: Kevin De Bruyne (Manchester City), İlkay Gündoğan (Manchester City), Bruno Fernandes (Manchester United)
- FW: Harry Kane (Tottenham Hotspur), Mohamed Salah (Liverpool), Son Heung-min (Tottenham Hotspur)

**2019–20**
- GK: Nick Pope (Burnley)
- DF: Trent Alexander-Arnold (Liverpool), Virgil van Dijk (Liverpool), Çağlar Söyüncü (Leicester City), Andy Robertson (Liverpool)
- MF: Kevin De Bruyne (Manchester City), David Silva (Manchester City), Jordan Henderson (Liverpool)
- FW: Jamie Vardy (Leicester City), Pierre-Emerick Aubameyang (Arsenal), Sadio Mané (Liverpool)

**2018–19**
- GK: Ederson (Manchester City)
- DF: Trent Alexander-Arnold (Liverpool), Virgil van Dijk (Liverpool), Aymeric Laporte (Manchester City), Andy Robertson (Liverpool)
- MF: Bernardo Silva (Manchester City), Fernandinho (Manchester City), Paul Pogba (Manchester United)
- FW: Raheem Sterling (Manchester City), Sergio Agüero (Manchester City), Sadio Mané (Liverpool)

**2017–18**
- GK: David de Gea (Manchester United)
- DF: Kyle Walker (Manchester City), Nicolás Otamendi (Manchester City), Jan Vertonghen (Tottenham Hotspur), Marcos Alonso (Chelsea)
- MF: David Silva (Manchester City), Christian Eriksen (Tottenham Hotspur), Kevin De Bruyne (Manchester City)
- FW: Mohamed Salah (Liverpool), Harry Kane (Tottenham Hotspur), Sergio Agüero (Manchester City)

**2016–17**
- GK: David de Gea (Manchester United)
- DF: Kyle Walker (Tottenham Hotspur), Gary Cahill (Chelsea), David Luiz (Chelsea), Danny Rose (Tottenham Hotspur)
- MF: Eden Hazard (Chelsea), Dele Alli (Tottenham Hotspur), N'Golo Kanté (Chelsea), Sadio Mané (Liverpool)
- FW: Harry Kane (Tottenham Hotspur), Romelu Lukaku (Everton)

**2015–16**
- GK: David de Gea (Manchester United)
- DF: Héctor Bellerín (Arsenal), Toby Alderweireld (Tottenham Hotspur), Wes Morgan (Leicester City), Danny Rose (Tottenham Hotspur)
- MF: Riyad Mahrez (Leicester City), Dele Alli (Tottenham Hotspur), N'Golo Kanté (Leicester City), Dimitri Payet (West Ham United)
- FW: Jamie Vardy (Leicester City), Harry Kane (Tottenham Hotspur)

**2014–15**
- GK: David de Gea (Manchester United)
- DF: Branislav Ivanović (Chelsea), John Terry (Chelsea), Gary Cahill (Chelsea), Ryan Bertrand (Southampton)
- MF: Alexis Sánchez (Arsenal), Nemanja Matić (Chelsea), Philippe Coutinho (Liverpool), Eden Hazard (Chelsea)
- FW: Diego Costa (Chelsea), Harry Kane (Tottenham Hotspur)

**2013–14**
- GK: Petr Čech (Chelsea)
- DF: Séamus Coleman (Everton), Gary Cahill (Chelsea), Vincent Kompany (Manchester City), Luke Shaw (Southampton)
- MF: Adam Lallana (Southampton), Steven Gerrard (Liverpool), Yaya Touré (Manchester City), Eden Hazard (Chelsea)
- FW: Daniel Sturridge (Liverpool), Luis Suárez (Liverpool)

**2012–13**
- GK: David de Gea (Manchester United)
- DF: Pablo Zabaleta (Manchester City), Jan Vertonghen (Tottenham Hotspur), Rio Ferdinand (Manchester United), Leighton Baines (Everton)
- MF: Gareth Bale (Tottenham Hotspur), Juan Mata (Chelsea), Michael Carrick (Manchester United), Eden Hazard (Chelsea)
- FW: Robin van Persie (Manchester United), Luis Suárez (Liverpool)

**2011–12**
- GK: Joe Hart (Manchester City)
- DF: Kyle Walker (Tottenham Hotspur), Vincent Kompany (Manchester City), Fabricio Coloccini (Newcastle United), Leighton Baines (Everton)
- MF: David Silva (Manchester City), Yaya Touré (Manchester City), Scott Parker (Tottenham Hotspur), Gareth Bale (Tottenham Hotspur)
- FW: Robin van Persie (Arsenal), Wayne Rooney (Manchester United)

**2010–11**
- GK: Edwin van der Sar (Manchester United)
- DF: Bacary Sagna (Arsenal), Nemanja Vidić (Manchester United), Vincent Kompany (Manchester City), Ashley Cole (Chelsea)
- MF: Nani (Manchester United), Samir Nasri (Arsenal), Jack Wilshere (Arsenal), Gareth Bale (Tottenham Hotspur)
- FW: Carlos Tevez (Manchester City), Dimitar Berbatov (Manchester United)

**2009–10**
- GK: Joe Hart (Birmingham City)
- DF: Branislav Ivanović (Chelsea), Thomas Vermaelen (Arsenal), Richard Dunne (Aston Villa), Patrice Evra (Manchester United)
- MF: Antonio Valencia (Manchester United), Cesc Fàbregas (Arsenal), Darren Fletcher (Manchester United), James Milner (Aston Villa)
- FW: Wayne Rooney (Manchester United), Didier Drogba (Chelsea)

**2008–09**
- GK: Edwin van der Sar (Manchester United)
- DF: Glen Johnson (Portsmouth), Rio Ferdinand (Manchester United), Nemanja Vidić (Manchester United), Patrice Evra (Manchester United)
- MF: Cristiano Ronaldo (Manchester United), Steven Gerrard (Liverpool), Ryan Giggs (Manchester United), Ashley Young (Aston Villa)
- FW: Nicolas Anelka (Chelsea), Fernando Torres (Liverpool)

**2007–08**
- GK: David James (Portsmouth)
- DF: Bacary Sagna (Arsenal), Rio Ferdinand (Manchester United), Nemanja Vidić (Manchester United), Gaël Clichy (Arsenal)
- MF: Cristiano Ronaldo (Manchester United), Steven Gerrard (Liverpool), Cesc Fàbregas (Arsenal), Ashley Young (Aston Villa)
- FW: Emmanuel Adebayor (Arsenal), Fernando Torres (Liverpool)

**2006–07**
- GK: Edwin van der Sar (Manchester United)
- DF: Gary Neville (Manchester United), Rio Ferdinand (Manchester United), Nemanja Vidić (Manchester United), Patrice Evra (Manchester United)
- MF: Cristiano Ronaldo (Manchester United), Steven Gerrard (Liverpool), Paul Scholes (Manchester United), Ryan Giggs (Manchester United)
- FW: Didier Drogba (Chelsea), Dimitar Berbatov (Tottenham Hotspur)

**2005–06**
- GK: Shay Given (Newcastle United)
- DF: Pascal Chimbonda (Wigan Athletic), John Terry (Chelsea), Jamie Carragher (Liverpool), William Gallas (Chelsea)
- MF: Cristiano Ronaldo (Manchester United), Steven Gerrard (Liverpool), Frank Lampard (Chelsea), Joe Cole (Chelsea)
- FW: Thierry Henry (Arsenal), Wayne Rooney (Manchester United)

**2004–05**
- GK: Petr Čech (Chelsea)
- DF: Gary Neville (Manchester United), John Terry (Chelsea), Rio Ferdinand (Manchester United), Ashley Cole (Arsenal)
- MF: Shaun Wright-Phillips (Manchester City), Steven Gerrard (Liverpool), Frank Lampard (Chelsea), Arjen Robben (Chelsea)
- FW: Andrew Johnson (Crystal Palace), Thierry Henry (Arsenal)

**2003–04**
- GK: Tim Howard (Manchester United)
- DF: Lauren (Arsenal), Sol Campbell (Arsenal), John Terry (Chelsea), Ashley Cole (Arsenal)
- MF: Steven Gerrard (Liverpool), Frank Lampard (Chelsea), Patrick Vieira (Arsenal), Robert Pires (Arsenal)
- FW: Thierry Henry (Arsenal), Ruud van Nistelrooy (Manchester United)

**2002–03**
- GK: Brad Friedel (Blackburn Rovers)
- DF: Stephen Carr (Tottenham Hotspur), Sol Campbell (Arsenal), William Gallas (Chelsea), Ashley Cole (Arsenal)
- MF: Robert Pires (Arsenal), Patrick Vieira (Arsenal), Paul Scholes (Manchester United), Kieron Dyer (Newcastle United)
- FW: Thierry Henry (Arsenal), Alan Shearer (Newcastle United)

**2001–02**
- GK: Shay Given (Newcastle United)
- DF: Steve Finnan (Fulham), Rio Ferdinand (Leeds United), Sami Hyypiä (Liverpool), Wayne Bridge (Southampton)
- MF: Robert Pires (Arsenal), Roy Keane (Manchester United), Patrick Vieira (Arsenal), Ryan Giggs (Manchester United)
- FW: Ruud van Nistelrooy (Manchester United), Thierry Henry (Arsenal)

**2000–01**
- GK: Fabien Barthez (Manchester United)
- DF: Stephen Carr (Tottenham Hotspur), Jaap Stam (Manchester United), Wes Brown (Manchester United), Sylvinho (Arsenal)
- MF: Steven Gerrard (Liverpool), Roy Keane (Manchester United), Patrick Vieira (Arsenal), Ryan Giggs (Manchester United)
- FW: Teddy Sheringham (Manchester United), Thierry Henry (Arsenal)

**1999–00**
- GK: Nigel Martyn (Leeds United)
- DF: Gary Kelly (Leeds United), Jaap Stam (Manchester United), Sami Hyypiä (Liverpool), Ian Harte (Leeds United)
- MF: David Beckham (Manchester United), Roy Keane (Manchester United), Patrick Vieira (Arsenal), Harry Kewell (Leeds United)
- FW: Andy Cole (Manchester United), Kevin Phillips (Sunderland)

**1998–99**
- GK: Nigel Martyn (Leeds United)
- DF: Gary Neville (Manchester United), Sol Campbell (Tottenham Hotspur), Jaap Stam (Manchester United), Denis Irwin (Manchester United)
- MF: David Beckham (Manchester United), Emmanuel Petit (Arsenal), Patrick Vieira (Arsenal), David Ginola (Tottenham Hotspur)
- FW: Dwight Yorke (Manchester United), Nicolas Anelka (Arsenal)

**1997–98**
- GK: Nigel Martyn (Leeds United)
- DF: Gary Neville (Manchester United), Gary Pallister (Manchester United), Colin Hendry (Blackburn Rovers), Graeme Le Saux (Chelsea)
- MF: David Beckham (Manchester United), Nicky Butt (Manchester United), David Batty (Newcastle United), Ryan Giggs (Manchester United)
- FW: Michael Owen (Liverpool), Dennis Bergkamp (Arsenal)

**1996–97**
- GK: David Seaman (Arsenal)
- DF: Gary Neville (Manchester United), Tony Adams (Arsenal), Mark Wright (Liverpool), Stig Inge Bjørnebye (Liverpool)
- MF: David Beckham (Manchester United), Roy Keane (Manchester United), David Batty (Newcastle United), Steve McManaman (Liverpool)
- FW: Alan Shearer (Newcastle United), Ian Wright (Arsenal)

**1995–96**
- GK: David James (Liverpool)
- DF: Gary Neville (Manchester United), Tony Adams (Arsenal), Ugo Ehiogu (Aston Villa), Alan Wright (Aston Villa)
- MF: Steve Stone (Nottingham Forest), Rob Lee (Newcastle United), Ruud Gullit (Chelsea), David Ginola (Newcastle United)
- FW: Les Ferdinand (Newcastle United), Alan Shearer (Blackburn Rovers)

**1994–95**
- GK: Tim Flowers (Blackburn Rovers)
- DF: Rob Jones (Liverpool), Gary Pallister (Manchester United), Colin Hendry (Blackburn Rovers), Graeme Le Saux (Blackburn Rovers)
- MF: Tim Sherwood (Blackburn Rovers), Matt Le Tissier (Southampton), Paul Ince (Manchester United)
- FW: Jürgen Klinsmann (Tottenham Hotspur), Chris Sutton (Blackburn Rovers), Alan Shearer (Blackburn Rovers)

**1993–94**
- GK: Tim Flowers (Blackburn Rovers)
- DF: Gary Kelly (Leeds United), Gary Pallister (Manchester United), Tony Adams (Arsenal), Denis Irwin (Manchester United)
- MF: Paul Ince (Manchester United), Gary McAllister (Leeds United), David Batty (Blackburn Rovers)
- FW: Alan Shearer (Blackburn Rovers), Eric Cantona (Manchester United), Peter Beardsley (Newcastle United)

**1992–93**
- GK: Peter Schmeichel (Manchester United)
- DF: David Bardsley (Queens Park Rangers), Paul McGrath (Aston Villa), Gary Pallister (Manchester United), Tony Dorigo (Leeds United)
- MF: Roy Keane (Nottingham Forest), Gary Speed (Leeds United), Paul Ince (Manchester United), Ryan Giggs (Manchester United)
- FW: Alan Shearer (Blackburn Rovers), Ian Wright (Arsenal)

## Data

All award data lives in `src/data/awards.ts`. Player details (positions, appearances) are in `src/data/players.ts`. Both files are plain TypeScript — edit them directly to correct or extend the data.

To add a new season:
1. Add any new players to `src/data/players.ts`
2. Add POTY, YPOTY, and TOTY entries for the season to `src/data/awards.ts`
