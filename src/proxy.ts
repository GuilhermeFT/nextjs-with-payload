import { NextRequest, NextResponse } from 'next/server'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'

const LOCALES = ['en', 'pt']
const DEFAULT_LOCALE = 'pt'

function getLocale(request: NextRequest): string {
  const headers = request.headers

  const languages = new Negotiator({
    headers: {
      'accept-language': headers.get('accept-language') || '',
    },
  }).languages()

  return match(languages, LOCALES, DEFAULT_LOCALE)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname) return

  const locale = getLocale(request)

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|api|admin|static|favicon.ico).*)'],
}
