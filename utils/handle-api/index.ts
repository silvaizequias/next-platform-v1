import { apiUrl } from '@/helpers'
import { ApiHanlderValidatorType } from './validator'
import { revalidatePath, revalidateTag } from 'next/cache'

export default async function handleApi(
  data: ApiHanlderValidatorType,
): Promise<any> {
  const { cache, id, inputs, method, path, revalidate, tag } = data
  const URL = apiUrl

  try {
    switch (method) {
      case 'GET':
        if (id) {
          return await fetch(`${URL}/${path}/${id}`, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
            },
            next: { tags: [tag], revalidate: cache || 120 },
          })
            .then(async (data) => await data.json())
            .catch((error: any) => error?.message)
        } else {
          return await fetch(`${URL}/${path}`, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
            },
            next: { tags: [tag], revalidate: cache || 120 },
          })
            .then(async (data) => await data.json())
            .catch((error: any) => error?.message)
        }

      case 'POST':
        return await fetch(`${URL}/${path}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        })
          .then(async (data) => {
            revalidateTag(tag)
            revalidatePath(revalidate || '/')
            return await data.json()
          })
          .catch((error: any) => error?.message)

      case 'PATCH':
        return await fetch(`${URL}/${path}/${id}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        })
          .then(async (data) => await data.json())
          .catch((error: any) => error?.message)

      case 'DELETE':
        return await fetch(`${URL}/${path}/${id}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        })
          .then(async (data) => await data.json())
          .catch((error: any) => error?.message)

      default:
        throw new Error(`${method} not alowed`)
    }
  } catch (error: any) {
    return JSON.stringify(error?.message)
  }
}
