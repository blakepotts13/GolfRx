export function SkinsBoard() {
  const rows = [
    { hole: 1, player: 'Blake', score: 3, carryover: 1 },
    { hole: 2, player: 'Carryover', score: '-', carryover: 2 },
    { hole: 3, player: 'Chris', score: 2, carryover: 2 }
  ];

  return (
    <div className="panel">
      <h2>Individual Gross Skins</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Hole</th>
              <th>Winner</th>
              <th>Winning Score</th>
              <th>Carryover Units</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.hole}>
                <td>{row.hole}</td>
                <td>{row.player}</td>
                <td>{row.score}</td>
                <td>{row.carryover}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
