import { Member } from '../types/member.type'
import { CallbackPromise } from '../types/promise.type'
import {
  createMemberType,
  removeMemberType,
  updateMemberType,
} from '../validators/member.validator'

export class MembersService {
  async create(createMember: createMemberType): Promise<CallbackPromise> {
    try {
      return { success: true, response: createMember }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async findAll(): Promise<CallbackPromise> {
    try {
      const members: Member[] = []
      return { success: true, response: members }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async findOne(id: string): Promise<CallbackPromise> {
    try {
      return { success: true, response: id }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async update(
    id: string,
    updateMember: updateMemberType,
  ): Promise<CallbackPromise> {
    try {
      return { success: true, response: { id, updateMember } }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }

  async remove(
    id: string,
    removeMember: removeMemberType,
  ): Promise<CallbackPromise> {
    try {
      return { success: true, response: { id, removeMember } }
    } catch (error: any) {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    } finally {
    }
  }
}
