export async function removeAccount(id: string, definitely: boolean) {
  try {
    return 'account removed'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
