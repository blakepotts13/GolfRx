import { EventSummary } from '@/components/EventSummary';
import { IndividualLeaderboard } from '@/components/IndividualLeaderboard';
import { SkinsBoard } from '@/components/SkinsBoard';
import { TeamLeaderboard } from '@/components/TeamLeaderboard';
import { individualStandings, sampleEvent, teamStandings } from '@/lib/mockData';

export default function PublicEventPage() {
  return (
    <main className="grid">
      <EventSummary event={sampleEvent} />
      <TeamLeaderboard rows={teamStandings} />
      <IndividualLeaderboard rows={individualStandings} />
      <SkinsBoard />
    </main>
  );
}
