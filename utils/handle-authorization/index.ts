'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { MemberType, OrganizationType } from '@/types/organization'
import { getServerSession } from 'next-auth'
import { MemberAuthorizedType, UserAuthorizedType } from './types'
import { organizationRepositoryFindByDocument } from '@/repositories/organization/GET'

export const memberAuthorized = async ({
  organizationDocument,
  roles,
}: MemberAuthorizedType): Promise<boolean | any> => {
  const session = await getServerSession(nextAuthOptions)
  const userId: string = session?.user?.id ?? ''

  try {
    if (!organizationDocument) return false
    const organization: OrganizationType | any =
      await organizationRepositoryFindByDocument(organizationDocument)

    if (!organization) return false
    return organization?.members.map((member: MemberType) =>
      roles
        ? roles?.includes(member?.role) &&
          member?.active &&
          member?.userId == userId
          ? true
          : false
        : member?.active && member?.userId == userId
        ? true
        : false,
    )
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}

export const userAuthorized = async ({
  profiles,
}: UserAuthorizedType): Promise<boolean | any> => {
  const session = await getServerSession(nextAuthOptions)
  const userProfile = session?.user?.profile ?? ''

  try {
    if (!profiles) return false

    return userProfile && profiles.includes(userProfile)
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}
