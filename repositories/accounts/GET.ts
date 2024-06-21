export async function findAllAccounts() {
  try {
    return []
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findAccountById(id: string) {
  try {
    return 'account by ' + id
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findAccountByPhone(phone: string) {
  try {
    return 'account by ' + phone
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
