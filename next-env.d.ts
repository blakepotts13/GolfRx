'use client';

import { useMemo, useState } from 'react';
import type { PlayerRecord } from '@/types';

interface Props {
  players: PlayerRecord[];
  activeRange: 'front' | 'back';
  existingScores: Record<string, Record<number, number | null>>;
  onSave: (values: Record<string, Record<number, number | null>>, holes: number[]) => void;
  onAdvance: () => void;
}

export function TeeGroupScoring({ players, activeRange, existingScores, onSave, onAdvance }: Props) {
  const holes = useMemo(
    () => (activeRange === 'front' ? Array.from({ length: 9 }, (_, i) => i + 1) : Array.from({ length: 9 }, (_, i) => i + 10)),
    [activeRange]
  );
  const [draft, setDraft] = useState<Record<string, Record<number, string>>>({});
  const [message, setMessage] = useState('');

  function setValue(playerId: string, hole: number, value: string) {
    setDraft((current) => ({
      ...current,
      [playerId]: { ...current[playerId], [hole]: value },
    }));
  }

  function handleSave() {
    const payload: Record<string, Record<number, number | null>> = {};
    for (const player of players) {
      payload[player.player_id] = {};
      for (const hole of holes) {
        const raw = draft[player.player_id]?.[hole];
        if (raw === undefined || raw === '') {
          continue;
        }
        const parsed = Number(raw);
        if (Number.isFinite(parsed) && parsed > 0) {
          payload[player.player_id][hole] = parsed;
        }
      }
    }
    onSave(payload, holes);
    setMessage(`Saved scores for holes ${holes[0]}-${holes[holes.length - 1]}.`);
    setDraft({});
  }

  return (
    <div className="panel">
      <h2>My Tee Group Scoring</h2>
      <p>One scorer can enter individual hole scores for every player in the foursome. Tee group is separate from team.</p>
      <div className="badge" style={{ marginBottom: 12 }}>{activeRange === 'front' ? 'Front 9' : 'Back 9'}</div>
      <div className="score-grid small" style={{ marginBottom: 8 }}>
        <div>Player</div>
        {holes.map((hole) => (
          <div key={hole}>H{hole}</div>
        ))}
      </div>
      {players.map((player) => (
        <div className="score-grid" key={player.player_id} style={{ marginBottom: 8 }}>
          <div>
            <div>{player.player_name}</div>
            <div className="small">{player.team_name} · {player.skins_eligible ? 'Skins in' : 'Skins out'}</div>
          </div>
          {holes.map((hole) => (
            <input
              key={`${player.player_id}-${hole}`}
              value={draft[player.player_id]?.[hole] ?? String(existingScores[player.player_id]?.[hole] ?? '')}
              onChange={(event) => setValue(player.player_id, hole, event.target.value)}
              placeholder="-"
              inputMode="numeric"
            />
          ))}
        </div>
      ))}
      <div className="grid grid-2" style={{ marginTop: 16 }}>
        <button className="primary" onClick={handleSave}>Save Hole Scores</button>
        <button className="secondary" onClick={onAdvance}>{activeRange === 'front' ? 'Advance to Back 9' : 'Return to Front 9'}</button>
      </div>
      {message ? <p style={{ marginTop: 12 }}>{message}</p> : null}
    </div>
  );
}
