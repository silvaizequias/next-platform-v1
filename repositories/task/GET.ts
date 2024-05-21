'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { TaskType } from '@/types/task'
import { getServerSession } from 'next-auth'
import { TASK_REPOSITORY } from '..'

export const taskRepositoryFindMany = async (): Promise<TaskType[] | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${TASK_REPOSITORY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: { tags: ['tasks'], revalidate: 3600 },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const taskRepositoryFindByCode = async (
  code: string,
): Promise<TaskType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${TASK_REPOSITORY}/code/${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: { tags: ['task'], revalidate: 120 },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const taskRepositoryFindById = async (
  id: string,
): Promise<TaskType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${TASK_REPOSITORY}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: { tags: ['task'], revalidate: 120 },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}
