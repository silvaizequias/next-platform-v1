import { OrganizationCreateValidatorType } from '@/components/organizations/validator'

export async function createOrganization(
  data: OrganizationCreateValidatorType,
) {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
