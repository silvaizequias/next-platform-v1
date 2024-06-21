import { Account } from '@/interfaces/account.interface'

export async function findAllAccounts(): Promise<Account[] | any> {
  try {
    return []
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findAccountById(id: string): Promise<Account | any> {
  try {
    return 'account by ' + id
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findAccountByPhone(
  phone: string,
): Promise<Account | any> {
  try {
    return 'account by ' + phone
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
