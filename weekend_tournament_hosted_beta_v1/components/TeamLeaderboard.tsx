import type { TeamStanding } from '@/types';

export function TeamLeaderboard({ rows }: { rows: TeamStanding[] }) {
  return (
    <div className="panel">
      <h2>Team Leaderboard</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Team</th>
              <th>Thru</th>
              <th>Front 9</th>
              <th>Back 9</th>
              <th>Total 18</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.team_id}>
                <td>{index + 1}</td>
                <td>{row.team_name}</td>
                <td>{row.thru}</td>
                <td>{row.front_9_total}</td>
                <td>{row.back_9_total}</td>
                <td>{row.total_18}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
