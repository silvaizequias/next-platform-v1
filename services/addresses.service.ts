import { removeAddress } from '@/repositories/addresses/DELETE'
import {
  findAddressById,
  findAddressByZipCode,
  findAllAddresses,
} from '@/repositories/addresses/GET'
import { updateAddress } from '@/repositories/addresses/PATCH'
import { createAddress } from '@/repositories/addresses/POST'
import {
  AddressCreateValidatorType,
  AddressUpdateValidatorType,
} from '@/validators/addresses.validator'

export type Address = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  softDeleted?: boolean
  zipCode: string
  street?: string
  complement?: string
  district?: string
  city?: string
  state?: string
  country?: string
  latitude?: number
  longitude?: number
}

export default class AddressesService {
  create(data: AddressCreateValidatorType): Promise<any> {
    return createAddress(data)
  }

  findAll(): Promise<Address[] | any> {
    return findAllAddresses()
  }

  findById(id: string): Promise<Address | any> {
    return findAddressById(id)
  }

  findByZipCode(zipCode: string): Promise<Address | any> {
    return findAddressByZipCode(zipCode)
  }

  update(id: string, data: AddressUpdateValidatorType): Promise<any> {
    return updateAddress(id, data)
  }

  remove(id: string, definitely: boolean): Promise<any> {
    return removeAddress(id, definitely)
  }
}
