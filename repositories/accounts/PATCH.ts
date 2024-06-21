import { AccountUpdateValidatorType } from '@/validators/accounts.validator'

export async function updateAccount(
  id: string,
  data: AccountUpdateValidatorType,
): Promise<any> {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
