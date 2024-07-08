import { repositoryCreateMember } from '../repositories/members/create'
import {
  repositoryFindAllMembers,
  repositoryFindOneMember,
} from '../repositories/members/find'
import { repositoryRemoveMember } from '../repositories/members/remove'
import { repositoryUpdateMember } from '../repositories/members/update'
import { CallbackPromise } from '../types/promise.type'
import {
  createMemberType,
  removeMemberType,
  updateMemberType,
} from '../validators/member.validator'

export default class MembersService {
  async create(createMember: createMemberType): Promise<CallbackPromise> {
    return await repositoryCreateMember(createMember)
  }

  async findAll(): Promise<CallbackPromise> {
    return await repositoryFindAllMembers()
  }

  async findOne(id: string): Promise<CallbackPromise> {
    return await repositoryFindOneMember(id)
  }

  async update(
    id: string,
    updateMember: updateMemberType,
  ): Promise<CallbackPromise> {
    return await repositoryUpdateMember(id, updateMember)
  }

  async remove(
    id: string,
    removeMember: removeMemberType,
  ): Promise<CallbackPromise> {
    return await repositoryRemoveMember(id, removeMember)
  }
}
