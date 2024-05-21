'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import {
  CreateOrganizationValidation,
  CreateOrganizationValidationType,
} from '@/validations/organization'
import { getServerSession } from 'next-auth'
import { ORGANIZATION_REPOSITORY } from '..'

export const organizationRepositoryCreateForUser = async (
  inputs: CreateOrganizationValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''
  const userPhone = session?.user?.phone ?? ''

  try {
    if (await CreateOrganizationValidation.parseAsync(inputs)) {
      const phone: string = inputs?.phoneCountry + inputs?.phone
      delete inputs?.phoneCountry

      return await fetch(`${ORGANIZATION_REPOSITORY}/phone/${userPhone}`, {
        method: 'POST',
        body: JSON.stringify({ ...inputs, phone: phone }),
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

export const organizationRepositoryCreate = async (
  inputs: CreateOrganizationValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await CreateOrganizationValidation.parseAsync(inputs)) {
      const phone: string = inputs?.phoneCountry + inputs?.phone
      delete inputs?.phoneCountry

      return await fetch(`${ORGANIZATION_REPOSITORY}`, {
        method: 'POST',
        body: JSON.stringify({ ...inputs, phone: phone }),
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
