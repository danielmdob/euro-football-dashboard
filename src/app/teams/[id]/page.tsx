import { PrismaClient } from '@prisma/client';
import { PageParams } from '@/types';

const client = new PrismaClient();
export default async function Team({params}: {params: PageParams}) {
  const matches = client.match.findMany({
    where: {
      OR: [
        {
          homeTeamId: {
            equals: params.id
          },
          awayTeamId: {
            equals: params.id
          }
        },
        {}
      ],
    },
  });
}
