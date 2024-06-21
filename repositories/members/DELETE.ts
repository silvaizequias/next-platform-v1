export async function removeMember(id: string, definitely: boolean): Promise<any> {
  try {
    return 'member removed'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
