import { LoginValidation, LoginValidationType } from '@/validations/login'
import Jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const inputs: LoginValidationType = await request.json()

    if (await LoginValidation.parseAsync(inputs)) {
      const { phone, secret } = inputs

      if (!secret)
        return new Response(JSON.stringify(`secret sended to ${phone}`))

      const payload = {
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      }
      const token = Jwt.sign(payload, process.env.SECRET ?? '')

      return new Response(
        JSON.stringify({
          token,
          expiresIn: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
        }),
      )
    }
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  } finally {
  }
}
