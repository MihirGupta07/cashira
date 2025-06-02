import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    userAgent: request.headers.get('user-agent') || 'Unknown',
    origin: request.headers.get('origin') || 'Unknown',
    referer: request.headers.get('referer') || 'Unknown',
    host: request.headers.get('host') || 'Unknown',
    protocol: request.headers.get('x-forwarded-proto') || 'http',
    sessionCookie: {
      exists: !!sessionCookie,
      value: sessionCookie ? '[REDACTED]' : null,
      length: sessionCookie?.value.length || 0,
    },
    allCookies: cookieStore.getAll().map(cookie => ({
      name: cookie.name,
      hasValue: !!cookie.value,
      valueLength: cookie.value.length,
    })),
    requestHeaders: Object.fromEntries(request.headers.entries()),
  };

  return NextResponse.json(debugInfo, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
} 