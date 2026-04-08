import { NextResponse } from 'next/server';
import { z } from 'zod';

const scoreEntrySchema = z.object({
  event_id: z.string(),
  player_id: z.string(),
  hole_number: z.number().int().min(1).max(18),
  strokes: z.number().int().min(1).max(20),
  entered_by_user_id: z.string()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = scoreEntrySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    message: 'Score entry placeholder',
    data: parsed.data,
    next: 'Persist to player_hole_scores, then recalculate team/individual/skins views.'
  });
}
