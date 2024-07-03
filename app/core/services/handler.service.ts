import { apiUrl } from '@/helpers'
import { Handler } from '../interfaces/handler.interface'
import { revalidatePath, revalidateTag } from 'next/cache'

export class HandlerService {
  async create(handler: Handler): Promise<any> {
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
        return await data.json()
      })
      .catch((error: any) => error?.message)
  }

  async findAll(handler: Handler): Promise<[] | any> {
    const { cache, endpoint, path, tag, token } = handler

    return await fetch(`${endpoint || apiUrl}/${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ?? '',
      },
      next: { tags: [tag], revalidate: cache || 120 },
    })
      .then(async (data) => await data.json())
      .catch((error: any) => error?.message)
  }

  async findOne(handler: Handler): Promise<any> {
    const { cache, endpoint, id, path, tag, token } = handler

    return await fetch(`${endpoint || apiUrl}/${path}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ?? '',
      },
      next: { tags: [tag], revalidate: cache || 120 },
    })
      .then(async (data) => await data.json())
      .catch((error: any) => error?.message)
  }

  async update(handler: Handler): Promise<any> {
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
        return await data.json()
      })
      .catch((error: any) => error?.message)
  }

  async remove(handler: Handler): Promise<any> {
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
        return await data.json()
      })
      .catch((error: any) => error?.message)
  }
}
