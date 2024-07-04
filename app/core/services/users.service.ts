import { User } from '../interfaces/user.interface'
import {
  createUserType,
  removeUserType,
  updateUserType,
} from '../validators/user.validator'

export class UsersService {
  async create(createUser: createUserType): Promise<any> {
    try {
      return createUser
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async findAll(): Promise<User[] | any> {
    try {
      return []
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async findOne(id: string): Promise<User | any> {
    try {
      return { id }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async update(id: string, updateUser: updateUserType): Promise<any> {
    try {
      return { id, updateUser }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }

  async remove(id: string, removeUser: removeUserType): Promise<any> {
    try {
      return { id, removeUser }
    } catch (error: any) {
      console.error(error)
    } finally {
    }
  }
}
