import { Match, MatchResult } from '../types';
import classNames from 'classnames';

interface MatchDisplayProps {
  displayCompetition?: boolean;
  match: Partial<Match>;
}
export default function MatchDisplay({ displayCompetition = false, match }: MatchDisplayProps) {
  return (
    <div className="flex flex-col w-96 justify-between border p-6 rounded-md relative">
      {displayCompetition && <div className="text-sm mb-2 text-gray-300">{match.competition?.name}</div>}
      <div className={classNames('flex justify-between', { 'font-semibold': match.result === MatchResult.HomeWin })}>
        <span>{match.homeTeam?.name}</span>
        <span>{match.homeTeamGoals}</span>
      </div>
      <div className={classNames('flex justify-between', { 'font-semibold': match.result === MatchResult.AwayWin })}>
        <span>{match.awayTeam?.name}</span>
        <span>{match.awayTeamGoals}</span>
      </div>
    </div>
  );
}
