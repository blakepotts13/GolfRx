import { AuditEntry, TeamScoreRow, TournamentEvent } from '@/types';

export const demoEvent: TournamentEvent = {
  id: 'evt_demo_001',
  name: 'Weekend 2-Man Scramble',
  courseName: 'Timberlake Country Club',
  eventDate: '2026-04-11',
  teamSize: 2,
  startType: 'shotgun',
  scoreMode: 'net',
  skinsMode: 'gross',
  status: 'live',
};

export const leaderboardRows: TeamScoreRow[] = [
  { teamId: 't1', teamName: 'Potts / Hoosier', thru: 18, gross: 58, net: 54, skinsWon: 3 },
  { teamId: 't2', teamName: 'Rich / Roy', thru: 18, gross: 60, net: 55, skinsWon: 1 },
  { teamId: 't3', teamName: 'Lab / Golfnut', thru: 16, gross: 52, net: 49, skinsWon: 2 },
];

export const auditLog: AuditEntry[] = [
  {
    id: 'a1',
    eventId: 'evt_demo_001',
    teamId: 't1',
    hole: 7,
    previousScore: 4,
    newScore: 3,
    enteredBy: 'scorer@event.com',
    enteredAt: '2026-04-11T10:22:00Z',
  },
  {
    id: 'a2',
    eventId: 'evt_demo_001',
    teamId: 't3',
    hole: 11,
    previousScore: null,
    newScore: 2,
    enteredBy: 'admin@event.com',
    enteredAt: '2026-04-11T11:01:00Z',
  },
];
