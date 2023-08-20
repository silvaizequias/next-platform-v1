import { AuthResetPassword, AuthResetPasswordType } from '@/schemas/auth'

export const POST = async (request: Request) => {
  try {
    return request.json().then(async (inputs: AuthResetPasswordType) => {
      if (AuthResetPassword.validateSync(inputs)) {
        return new Response(JSON.stringify(inputs))
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
