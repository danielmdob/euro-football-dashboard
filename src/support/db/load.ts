import { PrismaClient } from '@prisma/client';
import { Competition, Team } from '../../types';

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
