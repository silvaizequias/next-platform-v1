import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
}

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl

  let hostname = request.headers
    .get('host')!
    .replace('.localhost:3210', `.${process.env.BASE_URL}`)

  if (
    hostname.includes('---') &&
    hostname.endsWith(`.${process.env.BASE_URL}`)
  ) {
    hostname = `${hostname.split('---')[0]}.${process.env.BASE_URL}`
  }

  const searchParams = request.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  if (hostname == `blog.${process.env.BASE_URL}`) {
    return NextResponse.rewrite(
      new URL(`/blog${path === '/' ? '' : path}`, request.url),
    )
  }

  if (hostname == `controle.${process.env.BASE_URL}`) {
    return NextResponse.rewrite(
      new URL(`/controle${path === '/' ? '' : path}`, request.url),
    )
  }

  if (hostname == `www.${process.env.BASE_URL}`) {
    return NextResponse.rewrite(
      new URL(`/main${path === '/' ? '' : path}`, request.url),
    )
  }

  if (hostname == `${process.env.BASE_URL}`) {
    return NextResponse.rewrite(
      new URL(`/main${path === '/' ? '' : path}`, request.url),
    )
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url))
}
