'use client';

import { useEffect, useState } from 'react';
import type { AppState } from '@/types';
import { loadState, saveState } from '@/lib/storage';

export default function LoginPage() {
  const [state, setState] = useState<AppState | null>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const current = loadState();
    setState(current);
    setEmail(current.lastLoginEmail);
  }, []);

  function handleSendMagicLink() {
    if (!state || !email.trim()) {
      setMessage('Enter an email address first.');
      return;
    }
    const player = state.players.find((item) => item.email?.toLowerCase() === email.trim().toLowerCase());
    const next = {
      ...state,
      lastLoginEmail: email.trim(),
      activeTeeGroupId: player?.tee_group_id ?? state.activeTeeGroupId,
    };
    setState(next);
    saveState(next);
    setMessage(player
      ? `Magic link simulated. ${player.player_name} is now tied to ${player.tee_group_name}.`
      : 'Magic link simulated. No exact player match found, so the existing tee group stayed active.');
  }

  return (
    <main className="panel">
      <h1>Login</h1>
      <p>Magic-link authentication is simulated locally in this build so you can test phone-browser access.</p>
      <div className="grid grid-2">
        <div>
          <label>Email</label>
          <input placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div style={{ alignSelf: 'end' }}>
          <button className="primary" onClick={handleSendMagicLink}>Send Magic Link</button>
        </div>
      </div>
      {state ? <p style={{ marginTop: 12 }}>Active tee group: <span className="badge">{state.teeGroups.find((group) => group.id === state.activeTeeGroupId)?.name ?? 'Unassigned'}</span></p> : null}
      {message ? <p style={{ marginTop: 12 }}>{message}</p> : null}
    </main>
  );
}
