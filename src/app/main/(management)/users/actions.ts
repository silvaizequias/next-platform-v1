'use server'

import { Session } from 'next-auth'
import { UserType } from './types'
import { env } from '@/environments'
import { CreateUserSchemaType } from './schema'
import { revalidatePath } from 'next/cache'

export async function actionGetUsers(
  session: Session,
): Promise<UserType | any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL!}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionCreateUser(
  session: Session,
  inputs: CreateUserSchemaType,
): Promise<any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL!}/users`, {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    if (!data) return null
    revalidatePath('/users')
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
