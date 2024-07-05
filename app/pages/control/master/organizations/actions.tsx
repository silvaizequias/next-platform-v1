import {
  createOrganization,
  removeOrganization,
  updateOrganization,
} from '@/app/core/validators/organization.validator'

export async function create(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = createOrganization.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}

export async function update(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = updateOrganization.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}

export async function remove(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = removeOrganization.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}
