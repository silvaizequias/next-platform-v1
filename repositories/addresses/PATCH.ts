import { AddressUpdateValidatorType } from '@/validators/addresses.validator'

export async function updateAddress(
  id: string,
  data: AddressUpdateValidatorType,
) {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
