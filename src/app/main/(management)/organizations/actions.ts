'use server'

import { Session } from 'next-auth'
import {
  CreateOrganizationDTO,
  CreateOrganizationDTOType,
  UpdateOrganizationDTO,
  UpdateOrganizationDTOType,
} from './dto'
import { revalidatePath } from 'next/cache'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionGetOrganizations(session: Session) {
  try {
    const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/organizations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })

    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionCreateOrganization(
  session: Session,
  inputs: CreateOrganizationDTOType,
) {
  try {
    if (await CreateOrganizationDTO.parseAsync(inputs)) {
      const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/organizations`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      revalidatePath('/organizations')
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionUpdateOrganization(
  session: Session,
  inputs: UpdateOrganizationDTOType,
  organizationId: string,
) {
  try {
    if (await UpdateOrganizationDTO.parseAsync(inputs)) {
      const data = await fetch(
        `${PLATFORM_MANAGEMENT_URL}/organizations/${organizationId}`,
        {
          method: 'PATCH',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.authorization}`,
          },
        },
      )
      revalidatePath('/organizations')
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
