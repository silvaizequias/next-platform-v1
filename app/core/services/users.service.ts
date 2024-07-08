import { repositoryCreateUser } from '../repositories/users/create'
import {
  repositoryFindAllUsers,
  repositoryFindOneUser,
} from '../repositories/users/find'
import { repositoryRemoveUser } from '../repositories/users/remove'
import { repositoryUpdateUser } from '../repositories/users/update'
import { CallbackPromise } from '../types/promise.type'
import {
  createUserType,
  removeUserType,
  updateUserType,
} from '../validators/user.validator'

export default class UsersService {
  async create(createUser: createUserType): Promise<CallbackPromise> {
    return await repositoryCreateUser(createUser)
  }

  async findAll(): Promise<CallbackPromise> {
    return repositoryFindAllUsers()
  }

  async findOne(id: string): Promise<CallbackPromise> {
    return await repositoryFindOneUser(id)
  }

  async update(
    id: string,
    updateUser: updateUserType,
  ): Promise<CallbackPromise> {
    return await repositoryUpdateUser(id, updateUser)
  }

  async remove(
    id: string,
    removeUser: removeUserType,
  ): Promise<CallbackPromise> {
    return await repositoryRemoveUser(id, removeUser)
  }
}
