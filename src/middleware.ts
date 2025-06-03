import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_ROUTES } from './lib/constants';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path is public
  const isPublic = PUBLIC_ROUTES.some((publicPath) => 
    path === publicPath || path.startsWith('/api/')
  );

  // If it's a public path, continue
  if (isPublic) {
    return NextResponse.next();
  }

  // For protected paths, we'll rely on client-side authentication
  // The AuthContext in the client will handle redirects if not authenticated
  return NextResponse.next();
}

// Match all request paths except for static files, images, etc.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - assets (asset files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|icons|manifest.json|assets).*)',
  ],
}; 