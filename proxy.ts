import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  const blocked = ['GPTBot', 'CCBot'];
  
  if (blocked.some(bot => ua.includes(bot))) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // --- Auth logic for /admin routes ---
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = await auth();
    
    // Protect all /admin routes except /admin/login
    if (!request.nextUrl.pathname.startsWith('/admin/login')) {
      if (!session) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }

    // Redirect authenticated users away from login page
    if (request.nextUrl.pathname.startsWith('/admin/login') && session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // --- i18n locale handling for /de, /fr, /it, /es, /nl routes ---
  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(de|fr|it|es|nl)(\/|$)/);
  if (localeMatch) {
    return intlMiddleware(request);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2)$).*)',
  ],
};
