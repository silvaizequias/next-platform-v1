import { removeMember } from '@/repositories/members/DELETE'
import { findAllMembers, findMemberById } from '@/repositories/members/GET'
import { updateMember } from '@/repositories/members/PATCH'
import { createMember } from '@/repositories/members/POST'
import { MemberCreateValidator, MemberUpdateValidator } from './validator'
import { revalidateTag } from 'next/cache'
import { Account } from '../accounts/actions'
import { Organization } from '../organizations/actions'

export type Member = {
  id: string
  createdAt: Date
  updatedAt?: Date
  role: string
  active: boolean
  accountId: string
  account: Account
  organizationId: string
  organization: Organization
}

export default class MemberActions {
  async create(_: unknown, form: FormData) {
    const inputs: any = Object.fromEntries(form)

    const validator = MemberCreateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    return createMember(inputs).then((data) => {
      revalidateTag('members')
      console.log(data)
      return {}
    })
  }

  findAll(): Promise<Member[] | any> {
    return findAllMembers()
  }

  findById(id: string): Promise<Member | any> {
    return findMemberById(id)
  }

  update(_: unknown, form: FormData, id: string) {
    const inputs: any = Object.fromEntries(form)

    const validator = MemberUpdateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    return updateMember(id, inputs).then((data) => {
      revalidateTag('members')
      console.log(data)
      return {}
    })
  }

  remove(id: string, definitely: boolean): Promise<any> {
    return removeMember(id, definitely)
  }
}
