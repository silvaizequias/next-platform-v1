import { AuthService } from '@/app/core/services/auth.service'
import { authLogin, authLoginType } from '@/app/core/validators/auth.validator'

const authService = new AuthService()

export async function POST(request: Request) {
  const inputs: authLoginType = await request.json()
  try {
    if (await authLogin.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await authService.authentication(inputs)),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
