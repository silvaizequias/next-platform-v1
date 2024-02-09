'use server'

import { CreateOrganizationUserSchemaType } from '@/app/main/(management)/organizations/users/schema'
import { env } from '@/environments'
import { Session } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function actionGetMyOrganizationUsers() {
  try {
    return
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionCreateMyOrganizationUser(
  session: Session,
  inputs: CreateOrganizationUserSchemaType,
): Promise<any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL}/organization-users`, {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    if (!data) return null
    revalidatePath(`/${inputs?.organizationDocument}/usuarios`)
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
