import { TeamScoreRow } from '@/types';

export default function LeaderboardTable({ rows }: { rows: TeamScoreRow[] }) {
  const sorted = [...rows].sort((a, b) => a.net - b.net || a.gross - b.gross);

  return (
    <div className="card">
      <div className="section-title">Live Leaderboard</div>
      <table className="table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th>Thru</th>
            <th>Gross</th>
            <th>Net</th>
            <th>Skins</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => (
            <tr key={row.teamId}>
              <td>{idx + 1}</td>
              <td>{row.teamName}</td>
              <td>{row.thru}</td>
              <td>{row.gross}</td>
              <td>{row.net}</td>
              <td>{row.skinsWon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
