import { CallbackPromise } from '@/app/core/types/promise.type'
import { AuthService } from '@/app/core/services/auth.service'
import { authCode, authLogin } from '@/app/core/validators/auth.validator'
import toast from 'react-hot-toast'

const authService = new AuthService()

export async function actionAuthentication(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = authLogin.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await authService
    .authentication(inputs)
    .then((data: CallbackPromise) => {
      toast.success(data?.message ?? '')
      return { success: data?.success ?? true, errors: undefined }
    })
    .catch((error: any) => {
      toast.error(`${error?.status} :: ${error?.message}`)
      return {
        success: false,
        errors: error?.message,
        status: error?.status,
      }
    })
}

export async function actionValidation(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = authCode.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await authService
    .validation(inputs)
    .then((data: CallbackPromise) => {
      toast.success(data?.message ?? '')
      return { success: data?.success ?? true, errors: undefined }
    })
    .catch((error: any) => {
      toast.error(`${error?.status} :: ${error?.message}`)
      return {
        success: false,
        errors: error?.message,
        status: error?.status,
      }
    })
}
