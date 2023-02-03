import uniq from 'lodash/uniq';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import { INTERNATIONAL_COMPETITIONS, NATIONAL_COMPETITIONS } from './data';
import { CompetitionTeamsMap, CompetitionToImport, Team } from '../../types';

const TEAM_COLUMNS = [
  'matchId',
  'stage',
  'date',
  'penalties',
  'penaltiesHomeScore',
  'penaltiesAwayScore',
  'teamNameHome',
];

const DATA_PATH = 'data';

export function extractTeams(): CompetitionTeamsMap {
  return NATIONAL_COMPETITIONS.reduce((acc, current) => {
    const buffer = fs.readFileSync(`${DATA_PATH}/${current.dataSheet}`);
    const matches = parse(buffer, {
      columns: TEAM_COLUMNS,
      relaxColumnCount: true,
      fromLine: 2,
    });
    const teams: Team[] = matches.map(({ teamNameHome }: { teamNameHome: string }) => ({ name: teamNameHome }));
    return { ...acc, [current.name]: teams };
  }, {});
}

export function extractCompetitions(): CompetitionToImport[] {
  return [...NATIONAL_COMPETITIONS, ...INTERNATIONAL_COMPETITIONS];
}
