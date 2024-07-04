import { Member } from '../interfaces/member.interface'
import {
  createMemberType,
  removeMemberType,
  updateMemberType,
} from '../validators/member.validator'

export class MembersService {
  async create(createMember: createMemberType): Promise<any> {
    try {
      return createMember
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async findAll(): Promise<Member[] | any> {
    try {
      return []
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async findOne(id: string): Promise<Member | any> {
    try {
      return { id }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async update(id: string, updateMember: updateMemberType): Promise<any> {
    try {
      return { id, updateMember }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async remove(id: string, removeMember: removeMemberType): Promise<any> {
    try {
      return { id, removeMember }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }
}
