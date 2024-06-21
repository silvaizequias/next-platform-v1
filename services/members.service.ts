import { removeMember } from '@/repositories/members/DELETE'
import { findAllMembers, findMemberById } from '@/repositories/members/GET'
import { updateMember } from '@/repositories/members/PATCH'
import { createMember } from '@/repositories/members/POST'
import {
  MemberCreateValidatorType,
  MemberUpdateValidatorType,
} from '@/validators/members.validator'

export default class MembersService {
  create(data: MemberCreateValidatorType) {
    return createMember(data)
  }

  findAll() {
    return findAllMembers()
  }

  findById(id: string) {
    return findMemberById(id)
  }

  update(id: string, data: MemberUpdateValidatorType) {
    return updateMember(id, data)
  }

  remove(id: string, definitely: boolean) {
    return removeMember(id, definitely)
  }
}
