import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(de|fr|it|es|nl)/:path*',
    '/((?!api|admin|_next|_vercel|actions|leads|subscribers|.*\\..*).*)'
  ]
};
