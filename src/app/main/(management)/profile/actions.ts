'use server'

import { env } from '@/environments'
import { Session } from 'next-auth'
import { UserType } from '../users/types'
import {
  ProfilePasswordUpdateSchemaType,
  ProfileUpdateSchemaType,
} from './schema'
import { revalidatePath } from 'next/cache'

export async function actionGetProfile(
  session: Session,
): Promise<UserType | any> {
  try {
    const data = await fetch(
      `${env.PLATFORM_API_URL}/users/${session?.user?.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionUpdateProfileInformation(
  session: Session,
  inputs: ProfileUpdateSchemaType,
): Promise<UserType | any> {
  try {
    const data = await fetch(
      `${env.PLATFORM_API_URL}/users/${session?.user?.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )
    if (!data) return null
    revalidatePath('/profile')
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionUpdateProfilePassword(
  session: Session,
  inputs: ProfilePasswordUpdateSchemaType,
): Promise<any> {
  try {
    const data = await fetch(
      `${env.PLATFORM_API_URL}/users/${session?.user?.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          password: inputs?.newPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )
    if (!data) return null
    revalidatePath('/profile')
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
