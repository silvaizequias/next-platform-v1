import AuthService from '@/app/core/services/auth.service'
import { authCode, authCodeType } from '@/app/core/validators/auth.validator'

const authService = new AuthService()

export async function POST(request: Request) {
  const inputs: authCodeType = await request.json()
  try {
    if (await authCode.parseAsync(inputs)) {
      return new Response(JSON.stringify(await authService.code(inputs)))
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
