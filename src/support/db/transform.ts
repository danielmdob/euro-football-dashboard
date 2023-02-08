import {
  Competition,
  CompetitionMatchesMap,
  CompetitionTeamsMap,
  CompetitionToImport,
  Match,
  MatchResult,
  Team,
} from '../../types';
import { PrismaClient } from '@prisma/client';
import uniqBy from 'lodash/uniqBy';
import { DateTime } from 'luxon';

export function transformCompetitions(competitions: CompetitionToImport[]): Competition[] {
  return competitions.map(({ name }) => ({
    name,
  }));
}

export async function transformTeams(prisma: PrismaClient, competitionTeams: CompetitionTeamsMap): Promise<Team[]> {
  const competitionNames: string[] = Object.keys(competitionTeams);
  let teams: Team[] = [];
  for (const competitionName of competitionNames) {
    const competition = (await prisma.competition.findFirst({
      where: {
        name: {
          equals: competitionName,
        },
      },
    })) as Competition;
    const uniqueCompetitionTeams: Team[] = uniqBy(competitionTeams[competitionName], 'name');
    for (let team of uniqueCompetitionTeams) {
      const existingTeam = teams.find((existingTeam) => existingTeam.name === team.name);
      if (existingTeam == null) {
        team.competitions = [competition];
        teams.push(team);
      } else {
        existingTeam.competitions?.push(competition);
      }
    }
  }
  return teams;
}

export async function transformMatches(
  prisma: PrismaClient,
  competitionMatchesMap: CompetitionMatchesMap,
): Promise<Match[]> {
  const competitionNames: string[] = Object.keys(competitionMatchesMap);
  let matches: Match[] = [];
  for (const competitionName of competitionNames) {
    const competition = (await prisma.competition.findFirst({
      where: {
        name: {
          equals: competitionName,
        },
      },
    })) as Competition;
    const competitionTeams = await prisma.team.findMany({
      where: {
        competitions: {
          some: {
            competition: {
              name: competitionName,
            },
          },
        },
      },
    });
    const competitionMatches = competitionMatchesMap[competitionName];
    const transformedMatches: Match[] = competitionMatches.map(
      ({ date, teamAwayScore, teamHomeScore, teamNameAway, teamNameHome }) => {
        let result = MatchResult.Draw;
        if (teamHomeScore > teamAwayScore) {
          result = MatchResult.HomeWin;
        } else if (teamAwayScore > teamHomeScore) {
          result = MatchResult.AwayWin;
        }
        const awayTeam: Team = competitionTeams.find((team) => team.name === teamNameAway) as Team;
        const homeTeam: Team = competitionTeams.find((team) => team.name === teamNameHome) as Team;
        return {
          awayTeam,
          awayTeamGoals: Number(teamAwayScore),
          competition,
          date: DateTime.fromFormat(date, 'dd/MM/yyyy').toJSDate(),
          homeTeam,
          homeTeamGoals: Number(teamHomeScore),
          result,
        };
      },
    );
    matches = [...matches, ...transformedMatches];
  }
  return matches;
}
