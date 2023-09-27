import { NextResponse } from 'next/server'
import { handleAuthorizations } from './helpers/handle-authorizations'

export default async function middleware(request: Request) {
  const { headers, method } = request
  const authorization = headers.get('authorization')!
  const validation = await handleAuthorizations({ authorization, method })

  try {
    if (!authorization)
      return new NextResponse('acesso não autorizado!', { status: 403 })

    switch (method) {
      case 'GET':
        if (validation) break
      case 'POST':
        if (validation) break
      case 'PATCH':
        if (validation) break
      default:
        return new NextResponse('acesso não autorizado!', { status: 403 })
    }
  } catch (error: any) {
    return new NextResponse(error?.message, error)
  }
}

export const config = {
  matcher: [
    '/api/accounts/:patch*',
    '/api/api-keys/:patch*',
    '/api/email-send/:patch*',
    '/api/openai/:patch*',
    '/api/organizations/:patch*',
    '/api/organizations-of-users/:patch*',
    '/api/session/:patch*',
    '/api/sms-send/:patch*',
    '/api/solutions/:patch*',
    '/api/solutions-of-organizations/:patch*',
    '/api/subscriptions/:patch*',
    '/api/users/',
    '/api',
  ],
}
