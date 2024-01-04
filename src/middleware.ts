import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!

  let hostname = req.headers
    .get('host')!
    .replace('.localhost:3000', `.${NEXT_PUBLIC_URL}`)

  if (hostname.includes('---')) {
    hostname = `${hostname.split('---')[0]}.${NEXT_PUBLIC_URL}`
  }

  const searchParams = req.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  if (hostname == `blog.${NEXT_PUBLIC_URL}`) {
    return NextResponse.rewrite(
      new URL(`/blog${path === '/' ? '' : path}`, req.url),
    )
  }

  if (hostname == `sistema.${NEXT_PUBLIC_URL}`) {
    return NextResponse.rewrite(
      new URL(`/sistema${path === '/' ? '' : path}`, req.url),
    )
  }

  if (hostname == `www.${NEXT_PUBLIC_URL}`) {
    return NextResponse.rewrite(
      new URL(`/landing${path === '/' ? '' : path}`, req.url),
    )
  }

  if (hostname == `${NEXT_PUBLIC_URL}`) {
    return NextResponse.rewrite(
      new URL(`/landing${path === '/' ? '' : path}`, req.url),
    )
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
}
