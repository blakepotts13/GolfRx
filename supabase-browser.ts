'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EventSummary } from '@/components/EventSummary';
import type { AppState } from '@/types';
import { loadState } from '@/lib/storage';

export default function HomePage() {
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  if (!state) return <main className="panel"><h1>Weekend Tournament Manager</h1><p>Loading app...</p></main>;

  return (
    <main className="grid">
      <EventSummary event={state.event} />
      <div className="grid grid-2">
        <div className="panel">
          <h2>Hosted Beta Scope</h2>
          <p>
            This starter is structured for weekend gross best-ball tournaments with separate tee groups,
            team and individual leaderboards, and individual gross skins.
          </p>
          <div className="grid grid-2">
            <Link href="/admin"><button className="primary">Open Admin</button></Link>
            <Link href="/scoring"><button className="secondary">Open Scoring</button></Link>
          </div>
        </div>
        <div className="panel">
          <h2>Tee Groups</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Group</th><th>Tee Time</th><th>Start</th></tr>
              </thead>
              <tbody>
                {state.teeGroups.map((group) => (
                  <tr key={group.id}><td>{group.name}</td><td>{group.tee_time || '-'}</td><td>{group.starting_hole}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
