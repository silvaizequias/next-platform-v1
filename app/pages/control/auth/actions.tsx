import { CallbackPromise } from '@/app/core/types/promise.type'
import { authCode, authLogin } from '@/app/core/validators/auth.validator'
import toast from 'react-hot-toast'

export async function actionAuthentication(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = authLogin.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  })
    .then(async (res: any) => {
      const data: CallbackPromise = await res.json()
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

  return await fetch('/api/login/' + inputs?.phone, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res: any) => {
      const data: CallbackPromise = await res.json()
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
