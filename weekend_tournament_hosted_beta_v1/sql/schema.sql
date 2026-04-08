-- Weekend Tournament Hosted Beta v1
-- Core schema for gross best-ball events with separate teams and tee groups.

create extension if not exists pgcrypto;

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text not null,
  email text unique not null,
  role text not null check (role in ('admin', 'scorer')),
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  event_date date not null,
  status text not null default 'draft' check (status in ('draft', 'live', 'finalized')),
  format text not null default 'best_ball' check (format = 'best_ball'),
  scoring_type text not null default 'gross' check (scoring_type = 'gross'),
  balls_to_count int not null check (balls_to_count in (1,2,3)),
  skins_enabled boolean not null default true,
  skins_type text not null default 'individual_gross' check (skins_type = 'individual_gross'),
  skins_carryovers boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists tee_groups (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  name text not null,
  tee_time timestamptz,
  starting_hole int check (starting_hole between 1 and 18),
  created_at timestamptz not null default now()
);

create table if not exists players (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists event_players (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  player_id uuid not null references players(id) on delete cascade,
  team_id uuid references teams(id) on delete set null,
  tee_group_id uuid references tee_groups(id) on delete set null,
  skins_eligible boolean not null default true,
  scorer_user_id uuid references app_users(id) on delete set null,
  unique(event_id, player_id)
);

create table if not exists player_hole_scores (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  player_id uuid not null references players(id) on delete cascade,
  hole_number int not null check (hole_number between 1 and 18),
  strokes int not null check (strokes between 1 and 20),
  entered_by_user_id uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(event_id, player_id, hole_number)
);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  actor_user_id uuid references app_users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Recommended database views for leaderboard calculations.
create or replace view v_individual_leaderboard as
select
  ephs.event_id,
  p.id as player_id,
  p.full_name as player_name,
  t.name as team_name,
  count(*) as holes_posted,
  sum(ephs.strokes) as total_gross
from player_hole_scores ephs
join players p on p.id = ephs.player_id
left join event_players ep on ep.event_id = ephs.event_id and ep.player_id = ephs.player_id
left join teams t on t.id = ep.team_id
group by ephs.event_id, p.id, p.full_name, t.name;

-- Team leaderboard should be computed in SQL function or API layer because balls_to_count varies by event.
