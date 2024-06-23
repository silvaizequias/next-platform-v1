import { apiUrl } from '@/helpers'
import { revalidatePath, revalidateTag } from 'next/cache'

interface Props {
  cache?: number
  id?: string
  inputs?: any
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  path: string
  revalidate?: string
  tag: string
}
export default async function handleApi(props: Props): Promise<any> {
  const { cache, id, inputs, method, path, revalidate, tag } = props
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
