import { removeMember } from '@/repositories/members/DELETE'
import { findAllMembers, findMemberById } from '@/repositories/members/GET'
import { updateMember } from '@/repositories/members/PATCH'
import { createMember } from '@/repositories/members/POST'
import {
  MemberCreateValidatorType,
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

  findAll(): Promise<Member[] | any> {
    return findAllMembers()
  }

  findById(id: string): Promise<Member | any> {
    return findMemberById(id)
  }

  update(id: string, data: MemberUpdateValidatorType): Promise<any> {
    return updateMember(id, data)
  }

  remove(id: string, definitely: boolean): Promise<any> {
    return removeMember(id, definitely)
  }
}
