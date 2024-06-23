import { removeAddress } from '@/repositories/addresses/DELETE'
import {
  findAddressById,
  findAddressByZipCode,
  findAllAddresses,
} from '@/repositories/addresses/GET'
import { updateAddress } from '@/repositories/addresses/PATCH'
import { createAddress } from '@/repositories/addresses/POST'
import { AddressCreateValidator, AddressUpdateValidator } from './validator'

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

export default class AddressActions {
  async create(_: unknown, form: FormData): Promise<any> {
    const inputs: any = Object.fromEntries(form)

    const validator = AddressCreateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    return createAddress(inputs).then((data) => {
      console.log(data)
      return {}
    })
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

  async update(_: unknown, form: FormData, id: string): Promise<any> {
    const inputs: any = Object.fromEntries(form)

    const validator = AddressUpdateValidator.safeParse(inputs)
    if (!validator.success)
      return { error: validator.error.flatten().fieldErrors }

    return updateAddress(id, inputs).then((data) => {
      console.log(data)
      return {}
    })
  }

  remove(id: string, definitely: boolean): Promise<any> {
    return removeAddress(id, definitely)
  }
}
