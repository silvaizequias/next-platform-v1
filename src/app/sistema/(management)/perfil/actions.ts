'server client'

import { uploadFileS3 } from '@/services/aws/s3'
import { Session } from 'next-auth'

interface Props {
  data: FormData | null
  session: Session
}

export async function profileAvatarUpdateAction(props: Props) {
  const { data, session } = props
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL

  try {
    const { url, status, message } = await uploadFileS3({
      data: data!,
      path: 'profile',
      session: session,
    })
    if (!url) return { status: status, message: message }

    const response = await fetch(
      `${PLATFORM_API_URL}/users/${session.user.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ image: url }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.user.authorization}`,
        },
      },
    )
    return { status: response.status, message: response.text() }
  } catch (error: any) {
    console.log(error)
    return { status: error?.status, message: error?.message }
  }
}
