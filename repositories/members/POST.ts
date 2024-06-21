export async function createMember() {
  try {
    return 'member removed'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
