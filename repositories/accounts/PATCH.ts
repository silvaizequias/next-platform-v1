export async function updateAccount(id: string) {
  try {
    return 'account updated'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
