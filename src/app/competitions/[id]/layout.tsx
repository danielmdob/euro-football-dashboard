import { PrismaClient } from '@prisma/client';
import { PageParams } from '../../../types';

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
      <aside className="flex flex-col">
        {teams.map((team) => (
          <div className="p-4" key={team.id}>
            {team.name}
          </div>
        ))}
      </aside>
      {children}
    </div>
  );
}
