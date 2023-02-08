import { PrismaClient } from '@prisma/client';
import { PageParams } from '@/types';
import MatchDisplay from '@/components/MatchDisplay';
import Link from 'next/link';

const client = new PrismaClient();
export default async function Team({ params }: { params: PageParams }) {
  const teamId = Number(params.id);
  const team = await client.team.findUnique({
    where: {
      id: teamId,
    },
  });
  const matches = await client.match.findMany({
    where: {
      OR: [
        {
          awayTeamId: {
            equals: teamId,
          },
        },
        {
          homeTeamId: {
            equals: teamId,
          },
        },
      ],
    },
    include: {
      awayTeam: true,
      competition: true,
      homeTeam: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
  const competitions = await client.competition.findMany({
    where: {
      teams: {
        some: {
          teamId: {
            equals: teamId,
          },
        },
      },
    },
  });

  return (
    <>
      <div className="flex p-6 border-y mb-6 font-semibold space-x-6 items-center">
        <div className="text-gray-300">{team?.name}</div>
        <div className="flex flex-col space-y-2">
          {competitions.map((competition) => (
            <Link href={`/competitions/${competition.id}`} key={competition.id}>
              {competition.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-6 items-center w-full">
        {matches.map((match) => (
          <MatchDisplay displayCompetition={competitions.length > 1} key={match.id} match={match} />
        ))}
      </div>
    </>
  );
}
