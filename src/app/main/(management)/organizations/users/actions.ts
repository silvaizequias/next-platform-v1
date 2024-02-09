'use server'

import { Session } from 'next-auth'
import { OrganizationUsersType } from './types'
import { env } from '@/environments'
import { CreateOrganizationUserSchemaType } from './schema'
import { revalidatePath } from 'next/cache'

export async function actionGetOrganizationUsers(
  session: Session,
): Promise<OrganizationUsersType[] | any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL!}/organization-users`, {
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

export default async function actionCreateOrganizationUser(
  session: Session,
  inputs: CreateOrganizationUserSchemaType,
): Promise<any> {
  const data = await fetch(`${env.PLATFORM_API_URL!}/organization-users`, {
    method: 'POST',
    body: JSON.stringify(inputs),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.authorization}`,
    },
  })
  if (!data) return null
  revalidatePath(`/organizations/usuarios`)
  return data && (await data.json())
}
