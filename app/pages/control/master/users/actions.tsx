import {
  createUser,
  removeUser,
  updateUser,
} from '@/app/core/validators/user.validator'

export async function create(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = createUser.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}

export async function update(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = updateUser.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}

export async function remove(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = removeUser.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}
