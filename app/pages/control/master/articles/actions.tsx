import {
  createArticle,
  removeArticle,
  updateArticle,
} from '@/app/core/validators/article.validator'

export async function create(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = createArticle.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}

export async function update(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = updateArticle.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}

export async function remove(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = removeArticle.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }
}
