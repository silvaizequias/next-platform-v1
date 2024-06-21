export async function createAccount() {
  try {
    return 'account created'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
