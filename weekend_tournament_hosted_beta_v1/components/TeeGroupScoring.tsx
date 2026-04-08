import { groupPlayers } from '@/lib/mockData';

const holesFront = Array.from({ length: 9 }, (_, i) => i + 1);

export function TeeGroupScoring() {
  return (
    <div className="panel">
      <h2>My Tee Group Scoring</h2>
      <p>One scorer can enter individual hole scores for every player in the foursome. Tee group is separate from team.</p>
      <div className="score-grid small" style={{ marginBottom: 8 }}>
        <div>Player</div>
        {holesFront.map((hole) => (
          <div key={hole}>H{hole}</div>
        ))}
      </div>
      {groupPlayers.map((player) => (
        <div className="score-grid" key={player.player_id} style={{ marginBottom: 8 }}>
          <div>
            <div>{player.player_name}</div>
            <div className="small">{player.team_name} · {player.skins_eligible ? 'Skins in' : 'Skins out'}</div>
          </div>
          {holesFront.map((hole) => (
            <input key={`${player.player_id}-${hole}`} defaultValue="" placeholder="-" inputMode="numeric" />
          ))}
        </div>
      ))}
      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <button className="primary">Save Hole Scores</button>
        <button className="secondary">Advance to Back 9</button>
      </div>
    </div>
  );
}
