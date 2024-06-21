import { OrganizationCreateValidatorType } from '@/validators/organizations.validator'

export async function createOrganization(
  data: OrganizationCreateValidatorType,
): Promise<any> {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
