import { UpdateUserDTOType } from '@/app/api/platform-management/users/dto'
import { uploadFileS3 } from '@/services/aws/s3'
import { Session } from 'next-auth'

interface ProfileAvatarUpdateProps {
  data: FormData | null
  session: Session
}

export async function profileAvatarUpdateAction(
  props: ProfileAvatarUpdateProps,
) {
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
      `${PLATFORM_API_URL}/users/${session?.user?.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ image: url }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )
    return { status: response.status, message: response.text() }
  } catch (error: any) {
    return { status: error?.status, message: error?.message }
  }
}

interface ProfileUpdateProps {
  data: UpdateUserDTOType
  session: Session
}
export async function profileUpdateAction(props: ProfileUpdateProps) {
  const { data, session } = props
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL

  try {
    const response = await fetch(
      `${PLATFORM_API_URL}/users/${session?.user?.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )
    return { status: response.status, message: response.text() }
  } catch (error: any) {
    return { status: error?.status, message: error?.message }
  }
}
