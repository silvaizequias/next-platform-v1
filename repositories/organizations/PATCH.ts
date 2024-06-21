export async function updateOrganization(id: string) {
  try {
    return 'organization updated'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
