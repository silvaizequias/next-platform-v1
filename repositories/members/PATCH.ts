export async function updateMember(id: string) {
  try {
    return 'member updated'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
