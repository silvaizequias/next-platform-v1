import { HandlerService } from '@/app/core/services/handler.service'
import {
  createUser,
  removeUser,
  updateUser,
} from '@/app/core/validators/user.validator'
import toast from 'react-hot-toast'

const handlerService = new HandlerService()

export async function actionCreateUser(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = createUser.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .create({ inputs: inputs, path: 'users', tag: 'users' })
    .then((data) => {
      toast.success(data?.message ?? '')
      return data
    })
    .catch((error) => {
      toast.error(`${error?.status} :: ${error?.message}`)
      return {
        success: false,
        errors: error?.message,
        status: error?.status,
      }
    })
}

export async function actionFindAllUsers() {
  return await handlerService
    .findAll({ path: 'users', tag: 'users' })
    .then((data) => {
      toast.success(data?.message ?? '')
      return data
    })
    .catch((error) => {
      toast.error(`${error?.status} :: ${error?.message}`)
      return {
        success: false,
        errors: error?.message,
        status: error?.status,
      }
    })
}

export async function actionFindOneUser(id: string) {
  return await handlerService
    .findOne({ id: id, path: 'users', tag: 'users' })
    .then((data) => {
      toast.success(data?.message ?? '')
      return data
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

export async function actionUpdateUser(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = updateUser.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .update({ id: inputs?.id, inputs: inputs, path: 'users', tag: 'users' })
    .then((data) => {
      toast.success(data?.message ?? '')
      return data
    })
    .catch((error) => {
      toast.error(`${error?.status} :: ${error?.message}`)
      return {
        success: false,
        errors: error?.message,
        status: error?.status,
      }
    })
}

export async function actionRemoveUser(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = removeUser.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .remove({ id: inputs?.id, inputs: inputs, path: 'users', tag: 'users' })
    .then((data) => {
      toast.success(data?.message ?? '')
      return data
    })
    .catch((error) => {
      toast.error(`${error?.status} :: ${error?.message}`)
      return {
        success: false,
        errors: error?.message,
        status: error?.status,
      }
    })
}
