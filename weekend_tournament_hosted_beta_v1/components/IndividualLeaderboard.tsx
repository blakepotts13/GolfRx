import type { IndividualStanding } from '@/types';

export function IndividualLeaderboard({ rows }: { rows: IndividualStanding[] }) {
  return (
    <div className="panel">
      <h2>Individual Leaderboard</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Player</th>
              <th>Team</th>
              <th>Thru</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.player_id}>
                <td>{index + 1}</td>
                <td>{row.player_name}</td>
                <td>{row.team_name}</td>
                <td>{row.thru}</td>
                <td>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
