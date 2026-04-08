import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Wire role-based route protection here once auth is implemented.
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/scoring/:path*'],
};
