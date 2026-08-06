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
  matcher: '/:path*' 
};
