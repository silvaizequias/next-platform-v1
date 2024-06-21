import { removeMember } from '@/repositories/members/DELETE'
import { findAllMembers, findMemberById } from '@/repositories/members/GET'
import { updateMember } from '@/repositories/members/PATCH'
import { createMember } from '@/repositories/members/POST'

export default class MembersService {
  create() {
    return createMember()
  }

  findAll() {
    return findAllMembers()
  }

  findById(id: string) {
    return findMemberById(id)
  }

  update(id: string) {
    return updateMember(id)
  }

  remove(id: string, definitely: boolean) {
    return removeMember(id, definitely)
  }
}
