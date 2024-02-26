'use server'

import { env } from '@/environments'
import { NoteType } from '@/types/note'

export const getNotes = async (
  authorizationKey: string,
): Promise<NoteType[] | any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorizationKey: authorizationKey,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const getNoteById = async (
  id: string,
  authorizationKey: string,
): Promise<NoteType | any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/notes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorizationKey: authorizationKey,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}
