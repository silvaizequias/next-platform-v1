'use server'

import { Session } from 'next-auth'
import {
  CreateOrganizationDTO,
  CreateOrganizationDTOType,
  CreateOrganizationUserDTO,
  CreateOrganizationUserDTOType,
  UpdateOrganizationUserDTO,
  UpdateOrganizationUserDTOType,
} from '../dto'
import { revalidatePath } from 'next/cache'

const PLATFORM_URL = process.env.PLATFORM_URL!

export default async function actionGetOrganizationByDocument(
  document: string,
  session?: Session,
) {
  try {
    const data = await fetch(
      `${PLATFORM_URL}/organizations/document/${document}`,
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

export async function actionGetMyOrganizations(session: Session) {
  try {
    const data = await fetch(
      `${PLATFORM_URL}/organization-users/user/${session?.user?.id}`,
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
  inputs: CreateOrganizationDTOType,
) {
  try {
    if (await CreateOrganizationDTO.parseAsync(inputs)) {
      const data = await fetch(
        `${PLATFORM_URL}/organizations/for-me/${session?.user?.phone}`,
        {
          method: 'POST',
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

export async function actionCreateMyOrganizationUser(
  session: Session,
  inputs: CreateOrganizationUserDTOType,
) {
  try {
    if (await CreateOrganizationUserDTO.parseAsync(inputs)) {
      const data = await fetch(`${PLATFORM_URL}/organization-users`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      revalidatePath(`/organziations/${inputs?.organizationDocument}`)
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionUpdateMyOrganizationUser(
  session: Session,
  inputs: UpdateOrganizationUserDTOType,
  id: string,
) {
  try {
    if (await UpdateOrganizationUserDTO.parseAsync(inputs)) {
      const data = await fetch(`${PLATFORM_URL}/organization-users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      revalidatePath(`/organziations/${inputs?.organizationDocument}`)
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
