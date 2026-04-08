'use client';

import { useEffect, useState } from 'react';
import { EventSummary } from '@/components/EventSummary';
import { IndividualLeaderboard } from '@/components/IndividualLeaderboard';
import { SkinsBoard } from '@/components/SkinsBoard';
import { TeamLeaderboard } from '@/components/TeamLeaderboard';
import type { AppState } from '@/types';
import { computeIndividualStandings, computeSkins, computeTeamStandings, loadState } from '@/lib/storage';

export default function LeaderboardPage() {
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  if (!state) return <main className="panel"><h1>Leaderboard</h1><p>Loading leaderboard...</p></main>;

  return (
    <main className="grid">
      <EventSummary event={state.event} />
      <TeamLeaderboard rows={computeTeamStandings(state)} />
      <IndividualLeaderboard rows={computeIndividualStandings(state)} />
      <SkinsBoard rows={computeSkins(state)} />
    </main>
  );
}
