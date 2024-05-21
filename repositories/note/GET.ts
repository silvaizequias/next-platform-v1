'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { NOTE_REPOSITORY } from '..'
import { NoteType } from '@/types/order'

export const noteRepositoryFindMany = async (): Promise<NoteType[] | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${NOTE_REPOSITORY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    next: {
      tags: ['notes'],
      revalidate: 3600,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const noteRepositoryFindById = async (
  id: string,
): Promise<NoteType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${NOTE_REPOSITORY}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    next: {
      tags: ['note'],
      revalidate: 3600,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}
