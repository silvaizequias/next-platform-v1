import { removeMember } from '@/repositories/members/DELETE'
import { findAllMembers, findMemberById } from '@/repositories/members/GET'
import { updateMember } from '@/repositories/members/PATCH'
import { createMember } from '@/repositories/members/POST'
import {
  MemberCreateValidator,
  MemberCreateValidatorType,
  MemberUpdateValidator,
  MemberUpdateValidatorType,
} from '@/validators/members.validator'
import { Account } from './accounts.service'
import { Organization } from './organizations.service'

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

export default class MembersService {
  create(data: MemberCreateValidatorType): Promise<any> {
    return createMember(data)
  }

  async createFormAction(_: unknown, form: FormData) {
    const inputs = Object.fromEntries(form)

    const validator = MemberCreateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    console.log(inputs)
    return {}
  }

  findAll(): Promise<Member[] | any> {
    return findAllMembers()
  }

  findById(id: string): Promise<Member | any> {
    return findMemberById(id)
  }

  update(id: string, data: MemberUpdateValidatorType): Promise<any> {
    return updateMember(id, data)
  }

  async updateFormAction(_: unknown, form: FormData) {
    const inputs = Object.fromEntries(form)

    const validator = MemberUpdateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    console.log(inputs)
    return {}
  }

  remove(id: string, definitely: boolean): Promise<any> {
    return removeMember(id, definitely)
  }
}
