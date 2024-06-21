export async function removeOrganization(id: string, definitely: boolean) {
  try {
    return 'organization removed'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
