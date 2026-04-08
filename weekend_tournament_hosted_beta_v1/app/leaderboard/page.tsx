import LeaderboardTable from '@/components/LeaderboardTable';
import { demoEvent, leaderboardRows } from '@/lib/mock-data';

export default function LeaderboardPage() {
  return (
    <div className="grid" style={{ gap: 18 }}>
      <div className="card row">
        <div>
          <div className="badge">Public view</div>
          <h2 style={{ margin: '10px 0 4px 0' }}>{demoEvent.name}</h2>
          <div className="muted">{demoEvent.courseName} • {demoEvent.eventDate}</div>
        </div>
        <div className="muted">Live refresh ready</div>
      </div>
      <LeaderboardTable rows={leaderboardRows} />
    </div>
  );
}
