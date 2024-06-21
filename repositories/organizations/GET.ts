export async function findAllOrganizations() {
  try {
    return 'all organizations'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findOrganizationById(id: string) {
  try {
    return 'organization by ' + id
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findOrganizationByDocument(document: string) {
  try {
    return 'organization by ' + document
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
