import './globals.css';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const client = new PrismaClient();

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: any }) {
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
          <ul className="flex font-semibold text-lg border-b">
            {competitions.map((competition) => (
              <Link className="p-6" key={competition.id} href={`competitions/${competition.id}`}>
                {competition.name}
              </Link>
            ))}
          </ul>
        </header>
        {children}
      </body>
    </html>
  );
}
