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
