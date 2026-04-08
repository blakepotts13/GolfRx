'use client';

import { useEffect, useMemo, useState } from 'react';
import { EventSummary } from '@/components/EventSummary';
import { TeeGroupScoring } from '@/components/TeeGroupScoring';
import type { AppState } from '@/types';
import { getPlayersForTeeGroup, loadState, saveHoleScores, saveState } from '@/lib/storage';

export default function ScoringPage() {
  const [state, setState] = useState<AppState | null>(null);
  const [activeRange, setActiveRange] = useState<'front' | 'back'>('front');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setState(loadState());
  }, []);

  const players = useMemo(() => state ? getPlayersForTeeGroup(state, state.activeTeeGroupId) : [], [state]);

  function handleSave(values: Record<string, Record<number, number | null>>, holes: number[]) {
    if (!state) return;
    const next = saveHoleScores({
      state,
      teeGroupId: state.activeTeeGroupId,
      holeNumbers: holes,
      values,
    });
    setState(next);
    saveState(next);
    setMessage(`Saved scores for ${players.length} players in ${state.teeGroups.find((group) => group.id === state.activeTeeGroupId)?.name ?? 'tee group'}.`);
  }

  if (!state) return <main className="panel"><h1>Scoring</h1><p>Loading scoring console...</p></main>;

  return (
    <main className="grid">
      <EventSummary event={state.event} />
      <div className="panel">
        <h2>Scoring Assignment</h2>
        <p>Logged in as {state.lastLoginEmail || 'local scorer'}.</p>
        <p>Active tee group: <span className="badge">{state.teeGroups.find((group) => group.id === state.activeTeeGroupId)?.name ?? 'Unassigned'}</span></p>
        {message ? <p>{message}</p> : null}
      </div>
      <TeeGroupScoring
        players={players}
        activeRange={activeRange}
        existingScores={state.scores}
        onSave={handleSave}
        onAdvance={() => setActiveRange((current) => current === 'front' ? 'back' : 'front')}
      />
      <div className="panel">
        <h2>Audit + Validation Notes</h2>
        <p>Saved scores now write locally in the browser and update the team leaderboard, individual leaderboard, and skins board on reload.</p>
        <p>Current audit entries: {state.auditLog.length}</p>
      </div>
    </main>
  );
}
