import Link from 'next/link';
import { EventSummary } from '@/components/EventSummary';
import { sampleEvent, teeGroups } from '@/lib/mockData';

export default function HomePage() {
  return (
    <main className="grid">
      <EventSummary event={sampleEvent} />
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
                {teeGroups.map((group) => (
                  <tr key={group.id}><td>{group.name}</td><td>{group.tee_time}</td><td>{group.starting_hole}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
