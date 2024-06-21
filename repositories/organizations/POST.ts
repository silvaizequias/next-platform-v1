export async function createOrganization() {
  try {
    return 'organization created'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
