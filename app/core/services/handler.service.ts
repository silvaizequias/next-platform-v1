import { apiUrl } from '@/app/core/helpers'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CallbackPromise } from '../types/promise.type'
import { handlerType } from '../validators/handler.validator'

export default class HandlerService {
  async create(handler: handlerType): Promise<CallbackPromise> {
    const { endpoint, inputs, path, revalidate, tag, token } = handler

    return await fetch(`${endpoint || apiUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ?? '',
      },
      body: JSON.stringify(inputs),
    })
      .then(async (data) => {
        revalidateTag(tag)
        revalidatePath(revalidate || '/')
        return {
          success: true,
          response: await data.json(),
        }
      })
      .catch((error: any) => {
        return {
          success: false,
          message: error?.message,
          status: error?.status,
        }
      })
  }

  async findAll(handler: handlerType): Promise<CallbackPromise> {
    const { cache, endpoint, path, tag, token } = handler

    return await fetch(`${endpoint || apiUrl}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ?? '',
      },
      next: { tags: [tag], revalidate: cache || 120 },
    })
      .then(async (data) => {
        return {
          success: true,
          response: await data.json(),
        }
      })
      .catch((error: any) => {
        return {
          success: false,
          message: error?.message,
          status: error?.status,
        }
      })
  }

  async findOne(handler: handlerType): Promise<CallbackPromise> {
    const { cache, endpoint, id, path, tag, token } = handler

    return await fetch(`${endpoint || apiUrl}/${path}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ?? '',
      },
      next: { tags: [tag], revalidate: cache || 120 },
    })
      .then(async (data) => {
        return {
          success: true,
          response: await data.json(),
        }
      })
      .catch((error: any) => {
        return {
          success: false,
          message: error?.message,
          status: error?.status,
        }
      })
  }

  async update(handler: handlerType): Promise<CallbackPromise> {
    const { endpoint, id, inputs, path, revalidate, tag, token } = handler

    return await fetch(`${endpoint || apiUrl}/${path}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ?? '',
      },
      body: JSON.stringify(inputs),
    })
      .then(async (data) => {
        revalidateTag(tag)
        revalidatePath(revalidate || '/')
        return {
          success: true,
          response: await data.json(),
        }
      })
      .catch((error: any) => {
        return {
          success: false,
          message: error?.message,
          status: error?.status,
        }
      })
  }

  async remove(handler: handlerType): Promise<CallbackPromise> {
    const { endpoint, id, inputs, path, revalidate, tag, token } = handler

    return await fetch(`${endpoint || apiUrl}/${path}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ?? '',
      },
      body: JSON.stringify(inputs),
    })
      .then(async (data) => {
        revalidateTag(tag)
        revalidatePath(revalidate || '/')
        return {
          success: true,
          response: await data.json(),
        }
      })
      .catch((error: any) => {
        return {
          success: false,
          message: error?.message,
          status: error?.status,
        }
      })
  }
}
