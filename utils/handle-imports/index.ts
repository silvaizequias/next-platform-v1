'use server'

import { getServerSession } from 'next-auth'
import { HandleImportType, ImportMembersType } from './types'
import { nextAuthOptions } from '@/libraries/next-auth'
import { hashSync } from 'bcryptjs'
import { memberRepositoryImportation } from '@/repositories/member/POST'
import { revalidatePath, revalidateTag } from 'next/cache'

export const handleImpot = async ({
  data,
  document,
  param,
}: HandleImportType) => {
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()
  const session = await getServerSession(nextAuthOptions)

  if (!session) return null

  switch (param) {
    case 'members':
      const importMembers: ImportMembersType[] | any[] = data?.map(
        (member: ImportMembersType) => ({
          profile: 'member',
          name: member?.name,
          email: member?.email,
          phone: member?.phone,
          document: member?.document,
          passHash: hashSync(randomCode, 10),
          zipCode: member?.zipCode,
          street: member?.street,
          complement: member?.complement,
        }),
      )

      return await memberRepositoryImportation(document, importMembers)
        .then((data) => {
          revalidateTag('users')
          revalidateTag('organization')
          revalidateTag('members')
          revalidatePath(`/${document}/membros`)

          return data
        })
        .catch((error) => console.log(error?.message))

    case 'orders':
      console.log(param, data)
      break
    case 'tasks':
      console.log(param, data)
      break
    default:
      return null
  }
}
