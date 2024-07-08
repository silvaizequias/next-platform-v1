import HandlerService from '@/app/core/services/handler.service'
import {
  createOrganization,
  removeOrganization,
  updateOrganization,
} from '@/app/core/validators/organization.validator'
import toast from 'react-hot-toast'

const handlerService = new HandlerService()

export async function actionCreateOrganization(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = createOrganization.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .create({
      endpoint: '/api',
      inputs: inputs,
      path: 'organizations',
      tag: 'organizations',
    })
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

export async function actionFindAllOrganizations() {
  return await handlerService
    .findAll({ endpoint: '/api', path: 'organizations', tag: 'organizations' })
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

export async function actionFindOneOrganization(id: string) {
  return await handlerService
    .findOne({
      endpoint: '/api',
      id: id,
      path: 'organizations',
      tag: 'organizations',
    })
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

export async function actionUpdateOrganization(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = updateOrganization.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .update({
      endpoint: '/api',
      id: inputs?.id,
      inputs: inputs,
      path: 'organizations',
      tag: 'organizations',
    })
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

export async function actionRemoveOrganization(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = removeOrganization.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .remove({
      endpoint: '/api',
      id: inputs?.id,
      inputs: inputs,
      path: 'organizations',
      tag: 'organizations',
    })
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
