import type { EventRecord, IndividualStanding, TeamStanding, TeeGroupRecord } from '@/types';

export const sampleEvent: EventRecord = {
  id: 'evt-weekend-open',
  name: 'Weekend Open',
  event_date: '2026-04-18',
  status: 'live',
  balls_to_count: 2,
  skins_enabled: true,
  skins_carryovers: true
};

export const teamStandings: TeamStanding[] = [
  { team_id: 't1', team_name: 'Team Alpha', thru: 18, front_9_total: 30, back_9_total: 31, total_18: 61 },
  { team_id: 't2', team_name: 'Team Birdie', thru: 18, front_9_total: 31, back_9_total: 31, total_18: 62 },
  { team_id: 't3', team_name: 'Team Eagle', thru: 18, front_9_total: 32, back_9_total: 33, total_18: 65 }
];

export const individualStandings: IndividualStanding[] = [
  { player_id: 'p1', player_name: 'Blake', team_name: 'Team Alpha', thru: 18, total: 70 },
  { player_id: 'p2', player_name: 'Chris', team_name: 'Team Birdie', thru: 18, total: 71 },
  { player_id: 'p3', player_name: 'Evan', team_name: 'Team Eagle', thru: 18, total: 72 },
  { player_id: 'p4', player_name: 'Mike', team_name: 'Team Alpha', thru: 18, total: 73 }
];

export const teeGroups: TeeGroupRecord[] = [
  { id: 'g1', name: 'Group 1', tee_time: '08:00 AM', starting_hole: 1 },
  { id: 'g2', name: 'Group 2', tee_time: '08:10 AM', starting_hole: 1 },
  { id: 'g3', name: 'Group 3', tee_time: '08:20 AM', starting_hole: 1 }
];

export const groupPlayers = [
  { player_id: 'p1', player_name: 'Blake', team_name: 'Team Alpha', tee_group_name: 'Group 1', skins_eligible: true },
  { player_id: 'p5', player_name: 'Ryan', team_name: 'Team Birdie', tee_group_name: 'Group 1', skins_eligible: true },
  { player_id: 'p6', player_name: 'Cody', team_name: 'Team Alpha', tee_group_name: 'Group 1', skins_eligible: true },
  { player_id: 'p7', player_name: 'Tyler', team_name: 'Team Eagle', tee_group_name: 'Group 1', skins_eligible: false }
];
