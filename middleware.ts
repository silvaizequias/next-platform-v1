import { NextRequest, NextResponse } from 'next/server'
import { env } from './environments'

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
}

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl

  let hostname = request.headers
    .get('host')!
    .replace('.localhost:3210', `.${env.BASE_URL}`)

  if (hostname.includes('---') && hostname.endsWith(`.${env.BASE_URL}`)) {
    hostname = `${hostname.split('---')[0]}.${env.BASE_URL}`
  }

  const searchParams = request.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  if (hostname == `${env.BASE_URL}`) {
    return NextResponse.rewrite(
      new URL(`/main${path === '/' ? '' : path}`, request.url),
    )
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url))
}
