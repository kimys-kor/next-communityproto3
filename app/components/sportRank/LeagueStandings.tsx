import React from "react";

interface TeamStanding {
  ranking: number;
  team: string;
  games: number;
  win: number;
  draw: number;
  loss: number;
  points: number;
}

interface LeagueStandingsProps {
  league: string;
}

const fakeData: { [key: string]: TeamStanding[] } = {
  EPL: [
    {
      ranking: 1,
      team: "Team A",
      games: 30,
      win: 20,
      draw: 5,
      loss: 5,
      points: 65,
    },
    {
      ranking: 2,
      team: "Team B",
      games: 30,
      win: 18,
      draw: 8,
      loss: 4,
      points: 62,
    },
    // Add more fake data...
  ],
  MLB: [
    {
      ranking: 1,
      team: "Team A",
      games: 162,
      win: 100,
      draw: 0,
      loss: 62,
      points: 100,
    },
    {
      ranking: 2,
      team: "Team B",
      games: 162,
      win: 95,
      draw: 0,
      loss: 67,
      points: 95,
    },
    // Add more fake data...
  ],
  NBA: [
    {
      ranking: 1,
      team: "Team A",
      games: 82,
      win: 60,
      draw: 0,
      loss: 22,
      points: 60,
    },
    {
      ranking: 2,
      team: "Team B",
      games: 82,
      win: 58,
      draw: 0,
      loss: 24,
      points: 58,
    },
    // Add more fake data...
  ],
  // Add more fake data for other leagues...
};

const LeagueStandings: React.FC<LeagueStandingsProps> = ({ league }) => {
  const standings = (fakeData[league] as TeamStanding[]) || [];

  return (
    <table className="min-w-full text-center">
      <thead>
        <tr className="border-semiblue border-solid border-b border-t text-blue font-semibold">
          <th className="py-2 text-sm">순위</th>
          <th className="py-2 text-sm">팀</th>
          <th className="py-2 text-sm">경기</th>
          <th className="py-2 text-sm">승</th>
          <th className="py-2 text-sm">무</th>
          <th className="py-2 text-sm">패</th>
          <th className="py-2 text-sm">승점</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team, index) => (
          <tr key={index}>
            <td className="py-2 text-sm">{team.ranking}</td>
            <td className="py-2 text-sm">{team.team}</td>
            <td className="py-2 text-sm">{team.games}</td>
            <td className="py-2 text-sm">{team.win}</td>
            <td className="py-2 text-sm">{team.draw}</td>
            <td className="py-2 text-sm">{team.loss}</td>
            <td className="py-2 text-sm">{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeagueStandings;
