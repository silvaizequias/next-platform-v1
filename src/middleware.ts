import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl

  let hostname = req.headers
    .get('host')!
    .replace('.localhost:3000', `.${process.env.NEXTAUTH_URL}`)

  if (hostname.includes('---')) {
    hostname = `${hostname.split('---')[0]}.${process.env.NEXTAUTH_URL}`
  }

  const searchParams = req.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  if (hostname == `blog.${process.env.NEXTAUTH_URL}`) {
    return NextResponse.rewrite(
      new URL(`/blog${path === '/' ? '' : path}`, req.url),
    )
  }

  if (hostname == `sistema.${process.env.NEXTAUTH_URL}`) {
    return NextResponse.rewrite(
      new URL(`/sistema${path === '/' ? '' : path}`, req.url),
    )
  }

  if (hostname == `www.${process.env.NEXTAUTH_URL}`) {
    return NextResponse.rewrite(
      new URL(`/landing/${path === '/' ? '' : path}`, req.url),
    )
  }

  if (hostname === 'localhost:3000' || hostname === process.env.NEXTAUTH_URL) {
    return NextResponse.rewrite(
      new URL(`/landing/${path === '/' ? '' : path}`, req.url),
    )
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
}
