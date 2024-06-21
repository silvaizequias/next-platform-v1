import { OrganizationUpdateValidatorType } from '@/validators/organizations.validator'

export async function updateOrganization(
  id: string,
  data: OrganizationUpdateValidatorType,
): Promise<any> {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
