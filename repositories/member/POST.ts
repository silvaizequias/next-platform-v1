'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { MEMBER_REPOSITORY } from '..'
import {
  MemberCreateValidation,
  MemberCreateValidationType,
} from '@/validations/member'

export const memberRepositoryCreate = async (
  inputs: MemberCreateValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await MemberCreateValidation.parseAsync(inputs)) {
      return await fetch(`${MEMBER_REPOSITORY}`, {
        method: 'POST',
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

export const memberRepositoryImportation = async (
  organization: string,
  inputs: any[],
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    return await fetch(`${MEMBER_REPOSITORY}/import/${organization}`, {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorization}`,
      },
    }).then(async (data) => await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}
