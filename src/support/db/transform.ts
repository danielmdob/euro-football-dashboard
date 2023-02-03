import { Competition, CompetitionTeamsMap, CompetitionToImport, Team } from '../../types';
import { PrismaClient } from '@prisma/client';
import uniqBy from 'lodash/uniqBy';

export function transformCompetitions(competitions: CompetitionToImport[]): Competition[] {
  return competitions.map(({ name }) => ({
    name,
  }));
}

export async function transformTeams(prisma: PrismaClient, competitionTeams: CompetitionTeamsMap): Promise<Team[]> {
  const competitionNames: string[] = Object.keys(competitionTeams);
  let teams: Team[] = [];
  for (const competitionName of competitionNames) {
    const competition = await prisma.competition.findFirst({
      where: {
        name: {
          equals: competitionName,
        },
      },
    });
    const uniqueCompetitionTeams: Team[] = uniqBy(competitionTeams[competitionName], 'name');
    for (let team of uniqueCompetitionTeams) {
      team.competitions = [competition as Competition];
    }
    teams = [...teams, ...uniqueCompetitionTeams];
  }
  return teams;
}
