import { PrismaClient } from '@prisma/client';
import { Competition, Match, Team } from '../../types';

export async function loadCompetitions(prisma: PrismaClient, competitions: Competition[]) {
  await prisma.competition.createMany({
    data: competitions,
  });
}

export async function loadTeams(prisma: PrismaClient, teams: Team[]) {
  await Promise.all(
    teams.map((team) => {
      return prisma.team.create({
        data: {
          name: team.name,
          competitions: {
            createMany: {
              data: team.competitions?.map((competition) => ({ competitionId: competition.id as number })) || [],
            },
          },
        },
      });
    }),
  );
}
export async function loadMatches(prisma: PrismaClient, matches: Match[]) {
  await prisma.match.createMany({
    data: matches.map((match) => ({
      awayTeamGoals: match.awayTeamGoals,
      awayTeamId: match.awayTeam.id as number,
      competitionId: match.competition.id as number,
      date: match.date,
      homeTeamGoals: match.homeTeamGoals,
      homeTeamId: match.homeTeam.id as number,
      result: match.result,
    })),
  });
}
