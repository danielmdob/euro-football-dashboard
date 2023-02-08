import { PrismaClient } from '@prisma/client';
import { loadCompetitions, loadMatches, loadTeams } from './load';
import { extractCompetitions, extractMatches, extractTeams } from './extract';
import { transformCompetitions, transformMatches, transformTeams } from './transform';
import { CompetitionMatchesMap, CompetitionTeamsMap, Match } from '@/types';

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

async function importMatches() {
  const competitionMatches: CompetitionMatchesMap = extractMatches();
  const transformedMatches: Match[] = await transformMatches(prisma, competitionMatches);
  await loadMatches(prisma, transformedMatches);
}

async function main() {
  await importCompetitions();
  await importTeams();
  await importMatches();
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
