'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { ORGANIZATION_REPOSITORY } from '..'
import {
  UpdateOrganizationValidation,
  UpdateOrganizationValidationType,
} from '@/validations/organization'

export const organizationRepositoryUpdate = async (
  id: string,
  inputs: UpdateOrganizationValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await UpdateOrganizationValidation.parseAsync(inputs)) {
      return await fetch(`${ORGANIZATION_REPOSITORY}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authorization}`,
        },
      }).then(async (data) => await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
