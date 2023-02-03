import { PrismaClient } from '@prisma/client';
import { loadCompetitions, loadTeams } from './load';
import { extractCompetitions, extractTeams } from './extract';
import { transformCompetitions, transformTeams } from './transform';
import { CompetitionTeamsMap } from '@/types';

const prisma = new PrismaClient();

async function importCompetitions() {
  const competitionsToImport = extractCompetitions();
  const transformedCompetitions = transformCompetitions(competitionsToImport);
  await loadCompetitions(prisma, transformedCompetitions);
}

async function importTeams() {
  const competitionTeams: CompetitionTeamsMap = extractTeams();
  const transformedTeams = await transformTeams(prisma, competitionTeams);
  await loadTeams(prisma, transformedTeams);
}

async function main() {
  await importCompetitions();
  await importTeams();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
