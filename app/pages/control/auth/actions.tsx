import { CallbackPromise } from '@/app/core/interfaces/promise.interface'
import { AuthService } from '@/app/core/services/auth.service'
import { authCode, authLogin } from '@/app/core/validators/auth.validator'
import toast from 'react-hot-toast'

const authService = new AuthService()

export async function authentication(_: unknown, formData: FormData) {
  try {
    const inputs: any = Object.fromEntries(formData)

    const validate = authLogin.safeParse(inputs)
    if (!validate.success) {
      return {
        errors: validate.error.flatten().fieldErrors ?? '',
        success: validate.success ?? false,
      }
    } else {
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
  } catch (error: any) {
    console.log(error)
  }
}

export async function validation(_: unknown, formData: FormData) {
  try {
    const inputs: any = Object.fromEntries(formData)

    const validate = authCode.safeParse(inputs)
    if (!validate.success) {
      return {
        errors: validate.error.flatten().fieldErrors ?? '',
        success: validate.success ?? false,
      }
    } else {
      return await authService
        .validation(inputs)
        .then((data: CallbackPromise) => {
          toast.success(data?.message ?? '')
          return { success: data?.success ?? true, errors: undefined }
        })
    }
  } catch (error: any) {
    console.log(error)
  }
}
