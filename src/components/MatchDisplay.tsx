import { Match } from '../types';

interface MatchDisplayProps {
  match: Partial<Match>;
}
export default function MatchDisplay({ match }: MatchDisplayProps) {
  return (
    <div className="flex flex-col w-96 justify-between border p-6 rounded-md">
      <div className="flex justify-between">
        <span>{match.homeTeam?.name}</span>
        <span>{match.homeTeamGoals}</span>
      </div>
      <div className="flex justify-between">
        <span>{match.awayTeam?.name}</span>
        <span>{match.awayTeamGoals}</span>
      </div>
    </div>
  );
}
