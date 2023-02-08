import { PrismaClient } from '@prisma/client';
import { PageParams } from '../../../types';
import MatchDisplay from '@/components/MatchDisplay';

const client = new PrismaClient();
export default async function Competition({ params }: { params: PageParams }) {
  const matches = await client.match.findMany({
    where: {
      competitionId: Number(params.id),
    },
    include: {
      awayTeam: true,
      homeTeam: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
  console.log(matches);
  return (
    <div className="flex flex-col space-y-6 items-center w-full">
      {matches.map((match) => (
        <MatchDisplay key={match.id} match={match} />
      ))}
    </div>
  );
}
