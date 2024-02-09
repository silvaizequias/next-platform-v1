'use server'

import { env } from '@/environments'
import { Session } from 'next-auth'
import { OrganizationUsersType } from './(management)/organizations/users/types'
import { CreateOrganizationSchemaType } from './(management)/organizations/schema'
import { revalidatePath } from 'next/cache'

export async function actionGetMyOrganizations(
  session: Session,
): Promise<OrganizationUsersType | any> {
  try {
    const data = await fetch(
      `${env.PLATFORM_API_URL!}/organization-users/user/${session?.user?.id}`,
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

export async function actionCreateMyOrganization(
  session: Session,
  inputs: CreateOrganizationSchemaType,
): Promise<any> {
  try {
    const data = await fetch(
      `${env.PLATFORM_API_URL!}/organizations/for-me/${session?.user?.phone}`,
      {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )
    if (!data) return null
    revalidatePath('/')
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
