import { CallbackPromise } from '../interfaces/promise.interface'
import { User } from '../interfaces/user.interface'
import {
  createUserType,
  removeUserType,
  updateUserType,
} from '../validators/user.validator'

export class UsersService {
  async create(createUser: createUserType): Promise<CallbackPromise> {
    try {
      return { success: true, response: createUser }
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
      const users: User[] = []
      return { success: true, response: users }
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
    updateUser: updateUserType,
  ): Promise<CallbackPromise> {
    try {
      return { success: true, response: { id, updateUser } }
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
    removeUser: removeUserType,
  ): Promise<CallbackPromise> {
    try {
      return { success: true, response: { id, removeUser } }
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
