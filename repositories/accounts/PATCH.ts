import { AccountUpdateValidatorType } from '@/components/accounts/validator'

export async function updateAccount(
  id: string,
  data: AccountUpdateValidatorType,
) {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
