import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!
  const url = request.nextUrl

  let hostname = request.headers
    .get('host')!
    .replace('.localhost:3210', `.${NEXT_PUBLIC_URL}`)

  if (hostname.includes('---')) {
    hostname = `${hostname.split('---')[0]}.${NEXT_PUBLIC_URL}`
  }

  const searchParams = request.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  if (hostname == `blog.${NEXT_PUBLIC_URL}`) {
    return NextResponse.rewrite(
      new URL(`/blog${path === '/' ? '' : path}`, request.url),
    )
  }

  if (hostname == `connects.${NEXT_PUBLIC_URL}`) {
    return NextResponse.rewrite(
      new URL(`/connects${path === '/' ? '' : path}`, request.url),
    )
  }

  if (hostname == `${NEXT_PUBLIC_URL}`) {
    return NextResponse.rewrite(
      new URL(`/management${path === '/' ? '' : path}`, request.url),
    )
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url))
}

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
}
