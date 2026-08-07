import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  const blocked = ['GPTBot', 'CCBot', 'FacebookBot', 'Googlebot', 'Bingbot', 'AhrefsBot'];
  
  if (blocked.some(bot => ua.includes(bot))) {
    return new NextResponse('Access Denied', { status: 403 });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - images, css, and static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2)$).*)',
  ],
};
