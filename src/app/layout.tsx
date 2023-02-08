import './globals.css';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const client = new PrismaClient();

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: any }) {
  console.log('params', params);
  const competitions = await client.competition.findMany();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header>
          <ul className="flex font-semibold">
            {competitions.map((competition) => (
              <li className="p-6" key={competition.id}>
                <Link href={`competitions/${competition.id}`}>{competition.name}</Link>
              </li>
            ))}
          </ul>
        </header>
        {children}
      </body>
    </html>
  );
}
