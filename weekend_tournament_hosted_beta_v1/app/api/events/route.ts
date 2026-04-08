import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'List events endpoint placeholder',
    implemented_next: ['create event', 'update status', 'fetch event config']
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    message: 'Create event placeholder',
    received: body
  });
}
