'use server'

import { memberRepositoryUpdate } from '@/repositories/member/PATCH'
import { memberRepositoryCreate } from '@/repositories/member/POST'
import {
  MemberCreateValidationType,
  MemberUpdateValidationType,
} from '@/validations/member'
import { revalidatePath, revalidateTag } from 'next/cache'

export const createMember = async (
  inputs: MemberCreateValidationType,
): Promise<any> => {
  return await memberRepositoryCreate(inputs).then((data: any) => {
    revalidateTag('user')
    revalidateTag('member')
    revalidateTag('organization')
    revalidatePath(`/${inputs?.organizationDocument}/membros`)
    return data
  })
}

export const updateMember = async (
  id: string,
  inputs: MemberUpdateValidationType,
): Promise<any> => {
  return await memberRepositoryUpdate(id, inputs).then((data: any) => {
    revalidateTag('user')
    revalidateTag('member')
    revalidateTag('organization')
    revalidatePath(`/${inputs?.organizationDocument}/membros`)
    return data
  })
}
