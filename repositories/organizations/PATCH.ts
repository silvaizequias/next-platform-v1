import { OrganizationUpdateValidatorType } from '@/components/organizations/validator'

export async function updateOrganization(
  id: string,
  data: OrganizationUpdateValidatorType,
) {
  try {
    return data
  } catch (error: any) {
    throw new Error(error?.message, error?.status)
  } finally {
  }
}
