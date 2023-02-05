import { PrismaClient } from '@prisma/client';
import { Competition, Match, Team } from '../../types';

export async function loadCompetitions(prisma: PrismaClient, competitions: Competition[]) {
  await prisma.competition.createMany({
    data: competitions,
  });
}

export async function loadTeams(prisma: PrismaClient, teams: Team[]) {
  await Promise.all(
    teams.map((team) =>
      prisma.team.create({
        data: {
          name: team.name,
          competitions: {
            create: {
              competition: {
                connect: {
                  id: team.competitions && team.competitions[0].id,
                },
              },
            },
          },
        },
      }),
    ),
  );
}
export async function loadMatches(prisma: PrismaClient, matches: Match[]) {
  await prisma.match.createMany({
    data: matches.map((match) => ({
      awayTeamGoals: match.awayTeamGoals,
      awayTeamId: match.awayTeam.id as number,
      competitionId: match.competition.id as number,
      date: match.date,
      homeTeamGoals: match.awayTeamGoals,
      homeTeamId: match.homeTeam.id as number,
      result: match.result,
    })),
  });
}
