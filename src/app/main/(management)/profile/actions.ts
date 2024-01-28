'use server'

import { Session } from 'next-auth'
import {
  UpdateProfileInformationDTO,
  UpdateProfileInformationDTOType,
} from './dto'
import { revalidatePath } from 'next/cache'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionGetProfile(session: Session) {
  try {
    const data = await fetch(
      `${PLATFORM_MANAGEMENT_URL}/users/${session?.user?.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )

    return data && (await data.json())
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}

export async function actionUpdateProfile(
  session: Session,
  inputs: UpdateProfileInformationDTOType,
) {
  try {
    if (await UpdateProfileInformationDTO.parseAsync(inputs)) {
      const data = await fetch(
        `${PLATFORM_MANAGEMENT_URL}/users/${session?.user?.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.authorization}`,
          },
        },
      )
      revalidatePath('/profile')
      return data && (await data.json())
    }
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}
