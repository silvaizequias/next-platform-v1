import HandlerService from '@/app/core/services/handler.service'
import {
  createArticle,
  removeArticle,
  updateArticle,
} from '@/app/core/validators/article.validator'
import toast from 'react-hot-toast'

const handlerService = new HandlerService()

export async function actionCreateArticle(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = createArticle.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .create({ inputs: inputs, path: 'articles', tag: 'articles' })
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

export async function actionFindAllArticles() {
  return await handlerService
    .findAll({ path: 'articles', tag: 'articles' })
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

export async function articleFindOneArticle(id: string) {
  return await handlerService
    .findOne({ id: id, path: 'articles', tag: 'articles' })
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

export async function actionUpdateArticle(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = updateArticle.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .update({
      id: inputs?.id,
      inputs: inputs,
      path: 'articles',
      tag: 'articles',
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

export async function actionRemoveArticle(_: unknown, formData: FormData) {
  const inputs: any = Object.fromEntries(formData)

  const validate = removeArticle.safeParse(inputs)
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors ?? '',
      success: validate.success ?? false,
    }
  }

  return await handlerService
    .remove({
      id: inputs?.id,
      inputs: inputs,
      path: 'articles',
      tag: 'articles',
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
