import { NextResponse } from 'next/server';
import { leaderboardRows } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ rows: leaderboardRows, source: 'demo' });
}
