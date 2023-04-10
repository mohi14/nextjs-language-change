import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  const { geo } = req;
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  let locale = req.cookies.get('Language')?.value;
  if (!locale) {
    if (geo?.country === 'DE') {
      locale = 'de';
    } else if (req.headers.get('accept-language').split(',')[0].startsWith('de')) {
      locale = 'de';
    } else {
      locale = 'en';
    }
  }
  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }
  if (req.nextUrl.locale !== locale) {
    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }
}
