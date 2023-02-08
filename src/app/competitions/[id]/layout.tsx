import { PrismaClient } from '@prisma/client';
import { PageParams } from '../../../types';
import Link from 'next/link';

const client = new PrismaClient();

export default async function Layout({ children, params }: { children: React.ReactNode; params: PageParams }) {
  const teams = await client.team.findMany({
    where: {
      competitions: {
        some: {
          competitionId: { equals: Number(params.id) },
        },
      },
    },
  });

  return (
    <div className="flex">
      <aside className="flex flex-col border-r">
        {teams.map((team) => (
          <Link className="p-4 font-semibold" href={`/teams/${team.id}`} key={team.id}>
            {team.name}
          </Link>
        ))}
      </aside>
      {children}
    </div>
  );
}
