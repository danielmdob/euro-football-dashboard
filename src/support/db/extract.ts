import { parse } from 'csv-parse/sync';
import fs from 'fs';
import { INTERNATIONAL_COMPETITIONS, NATIONAL_COMPETITIONS } from './data';
import { CompetitionMatchesMap, CompetitionTeamsMap, CompetitionToImport, Match, Team } from '../../types';

const MATCH_COLUMNS = [
  'matchId',
  'stage',
  'date',
  'penalties',
  'penaltiesHomeScore',
  'penaltiesAwayScore',
  'teamNameHome',
  'teamNameAway',
  'teamHomeScore',
  'teamAwayScore',
];

const DATA_PATH = 'data';

export function extractCompetitions(): CompetitionToImport[] {
  return [...NATIONAL_COMPETITIONS, ...INTERNATIONAL_COMPETITIONS];
}

export function extractTeams(): CompetitionTeamsMap {
  return NATIONAL_COMPETITIONS.reduce((acc, current) => {
    const buffer = fs.readFileSync(`${DATA_PATH}/${current.dataSheet}`);
    const matches = parse(buffer, {
      columns: MATCH_COLUMNS,
      relaxColumnCount: true,
      fromLine: 2,
    });
    const teams: Team[] = matches.map(({ teamNameHome }: { teamNameHome: string }) => ({ name: teamNameHome }));
    return { ...acc, [current.name]: teams };
  }, {});
}

export function extractMatches(): CompetitionMatchesMap {
  return NATIONAL_COMPETITIONS.reduce((acc, current) => {
    const buffer = fs.readFileSync(`${DATA_PATH}/${current.dataSheet}`);
    const matches = parse(buffer, {
      columns: MATCH_COLUMNS,
      relaxColumnCount: true,
      fromLine: 2,
    });

    return { ...acc, [current.name]: matches };
  }, {});
}
