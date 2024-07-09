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
    .create({
      endpoint: '/api',
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

export async function actionFindAllArticles() {
  return await handlerService
    .findAll({ endpoint: '/api', path: 'articles', tag: 'articles' })
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

export async function actionFindOneArticle(id: string) {
  return await handlerService
    .findOne({ endpoint: '/api', id: id, path: 'articles', tag: 'articles' })
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

export async function actionFindBySlugArticle(slug: string) {
  return await handlerService
    .findOne({
      endpoint: '/api',
      id: slug,
      path: 'articles/slug',
      tag: 'articles',
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
      endpoint: '/api',
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
      endpoint: '/api',
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
