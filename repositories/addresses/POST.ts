import { AddressCreateValidatorType } from '@/validators/addresses.validator'

export async function createAddress(data: AddressCreateValidatorType) {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
