'use server'

import { env } from '@/environments'
import { Session } from 'next-auth'
import { OrganizationType } from './types'
import { CreateOrganizationSchemaType } from './schema'
import { revalidatePath } from 'next/cache'

export async function actionGetOrganizations(
  session: Session,
): Promise<OrganizationType[] | any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL}/organizations`, {
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

export async function actionCreateOrganization(
  session: Session,
  inputs: CreateOrganizationSchemaType,
): Promise<any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL}/organizations`, {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    if (!data) return null
    revalidatePath('/organizations')
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
