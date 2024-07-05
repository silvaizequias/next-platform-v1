import {
  createMember,
  removeMember,
  updateMember,
} from '@/app/core/validators/member.validator'

export async function create(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = createMember.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}

export async function update(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = updateMember.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}

export async function remove(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = removeMember.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}
