export async function removeAddress(id: string, definitely: boolean) {
  try {
    return 'address removed'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
