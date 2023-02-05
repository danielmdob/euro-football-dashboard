export interface Team {
  competitions?: Competition[];
  id?: number;
  name: string;
}

export interface Competition {
  id?: number;
  name: string;
}

export interface CompetitionToImport {
  name: string;
  dataSheet: string;
}

export interface CompetitionTeamsMap {
  [competition: string]: Team[];
}

export enum MatchResult {
  AwayWin = 'AWAY_WIN',
  Draw = 'DRAW',
  HomeWin = 'HOME_WIN',
}

export interface Match {
  awayTeam: Team;
  awayTeamGoals: number;
  competition: Competition;
  date: Date;
  homeTeam: Team;
  homeTeamGoals: number;
  id?: number;
  result: MatchResult;
}

export interface CompetitionMatchesMap {
  [competition: string]: MatchToImport[];
}

export interface MatchToImport {
  matchId: string;
  stage: string;
  date: string;
  penalties: string;
  penaltiesHomeScore: string;
  penaltiesAwayScore: string;
  teamNameHome: string;
  teamNameAway: string;
  teamHomeScore: string;
  teamAwayScore: string;
}
