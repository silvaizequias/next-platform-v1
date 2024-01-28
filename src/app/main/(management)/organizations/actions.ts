'use server'

import { Session } from 'next-auth'
import {
  CreateOrganizationDTO,
  CreateOrganizationDTOType,
  CreateOrganizationUserDTO,
  CreateOrganizationUserDTOType,
  UpdateOrganizationDTO,
  UpdateOrganizationDTOType,
} from './dto'
import { revalidatePath } from 'next/cache'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionGetMyOrganizations(session: Session) {
  try {
    const data = await fetch(
      `${PLATFORM_MANAGEMENT_URL}/organization-users/user/${session?.user?.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )

    return data && (await data.json())
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}

export async function actionCreateMyOrganization(
  session: Session,
  inputs: CreateOrganizationDTOType,
) {
  try {
    if (await CreateOrganizationDTO.parseAsync(inputs)) {
      const data = await fetch(
        `${PLATFORM_MANAGEMENT_URL}/organizations/for-me/${session?.user?.phone}`,
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
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}

export async function actionCreateMyOrganizationUser(
  session: Session,
  inputs: CreateOrganizationUserDTOType,
) {
  try {
    if (await CreateOrganizationUserDTO.parseAsync(inputs)) {
      const data = await fetch(
        `${PLATFORM_MANAGEMENT_URL}/organization-users`,
        {
          method: 'POST',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.authorization}`,
          },
        },
      )
      revalidatePath(`/organziations/${inputs?.organizationDocument}`)
      return data && (await data.json())
    }
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}

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
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
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
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}

export async function actionUpdateOrganization(
  session: Session,
  inputs: UpdateOrganizationDTOType,
  id: string,
) {
  try {
    if (await UpdateOrganizationDTO.parseAsync(inputs)) {
      const data = await fetch(
        `${PLATFORM_MANAGEMENT_URL}/organizations/${id}`,
        {
          method: 'PATH',
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
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}
