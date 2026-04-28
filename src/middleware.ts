/**
 * Next.js Middleware
 *
 * Handles Supabase session refresh and route protection.
 * Only runs on auth-related routes to avoid breaking public pages.
 */

import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Skip if Supabase env vars are not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  // Only run middleware on auth-related routes
  matcher: ['/account/:path*', '/sign-in', '/auth/:path*'],
};
