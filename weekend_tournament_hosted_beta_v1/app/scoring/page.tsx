import { TeeGroupScoring } from '@/components/TeeGroupScoring';
import { EventSummary } from '@/components/EventSummary';
import { sampleEvent } from '@/lib/mockData';

export default function ScoringPage() {
  return (
    <main className="grid">
      <EventSummary event={sampleEvent} />
      <TeeGroupScoring />
      <div className="panel">
        <h2>Audit + Validation Notes</h2>
        <p>
          Final build should write one row per player per hole and stamp created_by, updated_by, and updated_at.
          On live events, scorer permissions should be limited to the user&apos;s assigned tee group.
        </p>
      </div>
    </main>
  );
}
