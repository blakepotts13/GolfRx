export type AuditEntry = {
  id: string
  action: string
  user: string
  timestamp: string

export type EventStatus = 'draft' | 'live' | 'finalized';
export type Role = 'admin' | 'scorer' | 'public';

export interface EventRecord {
  id: string;
  name: string;
  event_date: string;
  status: EventStatus;
  balls_to_count: 1 | 2 | 3;
  skins_enabled: boolean;
  skins_carryovers: boolean;
}

export interface TeamStanding {
  team_id: string;
  team_name: string;
  thru: number;
  front_9_total: number;
  back_9_total: number;
  total_18: number;
}

export interface IndividualStanding {
  player_id: string;
  player_name: string;
  team_name: string;
  thru: number;
  total: number;
}

export interface TeeGroupRecord {
  id: string;
  name: string;
  tee_time: string | null;
  starting_hole: number | null;
}
