import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  if (url.pathname.startsWith('/sistema')) {
    let subdomains = url.hostname

    if (url.hostname.indexOf('.dedicado.digital')) {
      subdomains = url.hostname.split('.')[0]
    }
    if (url.hostname === 'hostname') {
      subdomains = 'sistema'
    }
    url.pathname = '/' + subdomains + '' + url.pathname

    //console.log('MIDDLEWARE LOG: ', url.pathname)
    return NextResponse.rewrite(url)
  }
  return null
}
