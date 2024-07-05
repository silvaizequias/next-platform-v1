import { HandlerService } from '@/app/core/services/handler.service'
import {
  createMember,
  removeMember,
  updateMember,
} from '@/app/core/validators/member.validator'
import toast from 'react-hot-toast'

const handlerService = new HandlerService()

export async function actionCreateMember(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = createMember.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .create({ inputs: inputs, path: 'members', tag: 'members' })
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

export async function actionFindAllMembers() {
  return await handlerService
    .findAll({ path: 'members', tag: 'members' })
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

export async function actionFindOneMember(id: string) {
  return await handlerService
    .findOne({ id: id, path: 'members', tag: 'members' })
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

export async function actionUpdateMember(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = updateMember.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .update({ id: inputs?.id, inputs: inputs, path: 'members', tag: 'members' })
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

export async function actionRemoveMember(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = removeMember.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .remove({ id: inputs?.id, inputs: inputs, path: 'members', tag: 'members' })
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
