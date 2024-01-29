'use server'

import { Session } from 'next-auth'
import {
  CreateOrganizationKeyDTO,
  CreateOrganizationKeyDTOType,
  UpdateOrganizationKeyDTO,
  UpdateOrganizationKeyDTOType,
} from './dto'
import { revalidatePath } from 'next/cache'

const PLATFORM_URL = process.env.PLATFORM_URL!

export async function actionGetOrganizationKeys(session: Session) {
  try {
    const data = await fetch(`${PLATFORM_URL}/organization-keys`, {
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

export async function actionCreateOrganizationKeys(
  session: Session,
  inputs: CreateOrganizationKeyDTOType,
) {
  try {
    if (await CreateOrganizationKeyDTO.parseAsync(inputs)) {
      const data = await fetch(`${PLATFORM_URL}/organization-keys`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      revalidatePath('/authorizations')
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionUpdateOrganizationKeys(
  session: Session,
  inputs: UpdateOrganizationKeyDTOType,
  id: string,
) {
  try {
    if (await UpdateOrganizationKeyDTO.parseAsync(inputs)) {
      const data = await fetch(`${PLATFORM_URL}/organization-keys/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      revalidatePath('/authorizations')
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
