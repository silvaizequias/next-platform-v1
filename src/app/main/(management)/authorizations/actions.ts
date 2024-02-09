'use server'

import { env } from '@/environments'
import { Session } from 'next-auth'
import { OrganizationKeyType } from './types'
import { CreateAuthorizationSchemaType } from './schema'
import { revalidatePath } from 'next/cache'

export async function actionGetOrganizationKeys(
  session: Session,
): Promise<OrganizationKeyType[] | any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL!}/organization-keys`, {
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

export async function actionCreateOrganizationKey(
  session: Session,
  inputs: CreateAuthorizationSchemaType,
): Promise<any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL!}/organization-keys`, {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    if (!data) return null
    revalidatePath('/authorizations')
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
