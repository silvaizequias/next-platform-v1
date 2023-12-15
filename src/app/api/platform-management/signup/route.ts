import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { SignUpDTO, SignUpDTOType } from './dto'
import { sendWelcomeMessage } from '@/utils/send-message'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    if (!session) {
      const inputs: SignUpDTOType = await request.json()
      if (await SignUpDTO.parseAsync(inputs)) {
        const data = await fetch(`${PLATFORM_API_URL}/auth/signup`, {
          method: 'POST',
          body: JSON.stringify({
            email: inputs.email,
            name: inputs.name,
            password: inputs?.password || randomCode,
            phone: inputs.phone,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        await sendWelcomeMessage({
          emailTo: inputs.email,
          name: inputs.name,
          password: inputs?.password || randomCode,
          phoneTo: `+55${inputs.phone}`,
        })
        return new Response(JSON.stringify(await data.json()), {
          status: data.status,
        })
      }
    }

    return new Response(JSON.stringify('você já está registrado no sistema'), {
      status: 401,
    })
  } catch (error: any) {
    return new Response(error.message || error, { status: 400 })
  }
}
