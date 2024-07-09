import toast from 'react-hot-toast'
import {
  createSubscription,
  removeSubscription,
  updateSubscription,
} from '../validators/subscription.validator'
import HandlerService from '../services/handler.service'

const handlerService = new HandlerService()

export async function actionCreateSubscription(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = createSubscription.safeParse(inputs)
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
      path: 'subscriptions',
      tag: 'subscriptions',
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

export async function actionFindAllSubscriptions() {
  return await handlerService
    .findAll({ endpoint: '/api', path: 'subscriptions', tag: 'subscriptions' })
    .then((data) => {
      return data.response
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

export async function actionFindOneSubscription(id: string) {
  return await handlerService
    .findOne({
      endpoint: '/api',
      id: id,
      path: 'subscriptions',
      tag: 'subscriptions',
    })
    .then((data) => {
      return data.response
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

export async function actionUpdateSubscription(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = updateSubscription.safeParse(inputs)
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
      path: 'subscriptions',
      tag: 'subscriptions',
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

export async function actionRemoveSubscription(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = removeSubscription.safeParse(inputs)
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
      path: 'subscriptions',
      tag: 'subscriptions',
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
