import { AccountCreateValidatorType } from '@/validators/accounts.validator'

export async function createAccount(
  data: AccountCreateValidatorType,
): Promise<any> {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
