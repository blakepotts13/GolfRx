# Weekend Tournament Hosted Beta v1

This is a **deployable starter scaffold** for a hosted weekend golf tournament app using **Next.js + Supabase**.

It is designed around the exact operating rules requested:

- gross only
- best ball team scoring
- admin chooses **1, 2, or 3** balls to count
- **individual gross skins**
- both **team leaderboard** and **individual leaderboard**
- **tee groups separate from teams**
- scorer enters all players in the tee group / foursome
- team leaderboard shows **Front 9**, **Back 9**, and **Full 18** totals

## Current state

This package is a **hosted beta starter**, not a fully wired production deployment yet.

Included:
- Next.js app structure
- mobile-oriented scoring page stub
- admin page stub
- public leaderboard page stub
- scoring utility functions
- Supabase/Postgres schema
- API route placeholders for event and score entry

Not yet fully wired:
- live Supabase auth flow
- row-level security policies
- full CRUD forms
- realtime subscriptions
- persisted leaderboard queries
- full tee-group assignment UI

## Project structure

- `app/admin/page.tsx` — event settings and tee group manager stub
- `app/scoring/page.tsx` — my tee group scoring screen
- `app/event/[id]/page.tsx` — public event view with team, individual, and skins boards
- `app/api/events/route.ts` — event endpoint placeholder
- `app/api/score-entry/route.ts` — score post endpoint placeholder
- `lib/scoring.ts` — core scoring helpers
- `sql/schema.sql` — database schema starter

## Data model notes

### Teams vs Tee Groups

These are intentionally separate:

- **Team** = competition entity for best-ball leaderboard
- **Tee Group** = playing foursome / score-entry permissions
- **Player** = owns individual scores and skins results

A player can be on **Team A** and in **Tee Group 3**.

## Team leaderboard math

For each hole:
1. get all player scores for the team
2. sort ascending
3. take lowest `balls_to_count`
4. sum them

Then:
- Front 9 = holes 1-9
- Back 9 = holes 10-18
- Full 18 = front + back

## Skins logic

Skins are **individual gross only**.

For each hole:
1. consider only `skins_eligible = true` players
2. lowest unique score wins the hole
3. tie for low score = no winner, carryover increments

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase setup

1. Create a new Supabase project.
2. Run `sql/schema.sql` in the SQL editor.
3. Add your URL and keys to `.env.local`.
4. Wire auth callbacks and role checks.
5. Add row-level security.

## Recommended next implementation order

1. Wire Supabase Auth with admin/scorer roles.
2. Build event create/edit forms.
3. Build roster, team, and tee-group assignment screens.
4. Persist score entry into `player_hole_scores`.
5. Add SQL function or API layer for team leaderboard calculation.
6. Add individual leaderboard and skins queries.
7. Add realtime subscriptions to leaderboard page.
8. Add event finalization and score lock logic.

## Suggested next sprint

The next high-value step is to fully wire these three paths:

- `login`
- `score entry by tee group`
- `public leaderboard`

That would turn this scaffold into a usable hosted beta for a live weekend event.
