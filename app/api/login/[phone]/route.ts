import { AuthService } from '@/app/core/services/auth.service'
import { authCode } from '@/app/core/validators/auth.validator'

export async function GET(
  request: Request,
  { params }: { params: { phone: string } },
) {
  const { phone } = params
  const authService = new AuthService()
  try {
    if (await authCode.parseAsync({ phone: phone })) {
      return new Response(
        JSON.stringify(await authService.validation({ phone })),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
