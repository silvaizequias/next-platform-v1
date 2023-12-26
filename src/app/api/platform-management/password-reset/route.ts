import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { sendPasswordResetMessage } from '@/utils/send-message'
import { PasswordResetDTO, PasswordResetDTOType } from './dto'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  try {
    if (!session) {
      const inputs: PasswordResetDTOType = await request.json()
      if (await PasswordResetDTO.parseAsync(inputs)) {
        const data = await fetch(`${PLATFORM_API_URL}/auth/password-reset`, {
          method: 'POST',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        await sendPasswordResetMessage({
          emailTo: inputs.email,
          phoneTo: `+55${inputs.phone}`,
        })
        return new Response(data.body, {
          status: data.status,
        })
      }
    }

    return new Response(
      JSON.stringify('acesse seu perfil para redefinir uma nova senha'),
      {
        status: 401,
      },
    )
  } catch (error: any) {
    return new Response(error.message || error, { status: 400 })
  }
}
