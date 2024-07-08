import { repositoryCreateAddress } from '../repositories/addresses/create'
import {
  repositoryFindAllAddresses,
  repositoryFindByZipCodeAddress,
  repositoryFindOneAddress,
} from '../repositories/addresses/find'
import { repositoryRemoveAddress } from '../repositories/addresses/remove'
import { repositoryUpdateAddress } from '../repositories/addresses/update'
import { CallbackPromise } from '../types/promise.type'
import {
  createAddressType,
  removeAddressType,
  updateAddressType,
} from '../validators/address.validator'

export default class AddressesService {
  async create(createAddress: createAddressType): Promise<CallbackPromise> {
    return await repositoryCreateAddress(createAddress)
  }

  async findAll(): Promise<CallbackPromise> {
    return await repositoryFindAllAddresses()
  }

  async findByZipCode(zipCode: string): Promise<CallbackPromise> {
    return await repositoryFindByZipCodeAddress(zipCode)
  }

  async findOne(id: string): Promise<CallbackPromise> {
    return await repositoryFindOneAddress(id)
  }

  async update(
    id: string,
    updateAddress: updateAddressType,
  ): Promise<CallbackPromise> {
    return await repositoryUpdateAddress(id, updateAddress)
  }

  async remove(
    id: string,
    removeAddress: removeAddressType,
  ): Promise<CallbackPromise> {
    return await repositoryRemoveAddress(id, removeAddress)
  }
}
