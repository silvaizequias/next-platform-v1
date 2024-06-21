import { Organization } from '@/interfaces/organization.interface'

export async function findAllOrganizations(): Promise<Organization[] | any> {
  try {
    return 'all organizations'
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findOrganizationById(
  id: string,
): Promise<Organization | any> {
  try {
    return 'organization by ' + id
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}

export async function findOrganizationByDocument(
  document: string,
): Promise<Organization | any> {
  try {
    return 'organization by ' + document
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
