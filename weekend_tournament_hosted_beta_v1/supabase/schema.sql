create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key,
  email text unique not null,
  full_name text,
  role text not null check (role in ('admin', 'scorer', 'public')),
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  course_name text not null,
  event_date date not null,
  team_size int not null check (team_size in (2,3,4)),
  start_type text not null check (start_type in ('shotgun', 'tee_times')),
  score_mode text not null check (score_mode in ('gross', 'net')),
  skins_mode text not null check (skins_mode in ('gross', 'net')),
  status text not null default 'draft' check (status in ('draft', 'live', 'final')),
  created_by uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text,
  handicap_index numeric(5,2),
  created_at timestamptz not null default now()
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  team_name text not null,
  start_hole int,
  tee_time timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.team_players (
  team_id uuid not null references public.teams(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  primary key (team_id, player_id)
);

create table if not exists public.holes (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  hole_number int not null check (hole_number between 1 and 18),
  par int not null,
  handicap_stroke_index int not null,
  unique (event_id, hole_number)
);

create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  hole_number int not null check (hole_number between 1 and 18),
  gross_score int not null,
  net_score int,
  updated_by uuid,
  updated_at timestamptz not null default now(),
  unique (event_id, team_id, hole_number)
);

create table if not exists public.score_audit_log (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  hole_number int not null,
  previous_score int,
  new_score int not null,
  changed_by uuid,
  changed_at timestamptz not null default now()
);

create table if not exists public.skins_results (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  hole_number int not null,
  team_id uuid not null references public.teams(id) on delete cascade,
  skin_type text not null check (skin_type in ('gross', 'net')),
  amount numeric(10,2),
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
alter table public.teams enable row level security;
alter table public.scores enable row level security;
alter table public.score_audit_log enable row level security;

-- Example starter policies. Tighten before production launch.
create policy if not exists public_read_leaderboard on public.scores for select using (true);
create policy if not exists public_admin_event_manage on public.events for all using (true) with check (true);
create policy if not exists public_team_manage on public.teams for all using (true) with check (true);
create policy if not exists public_score_manage on public.scores for all using (true) with check (true);
create policy if not exists public_audit_read on public.score_audit_log for select using (true);
