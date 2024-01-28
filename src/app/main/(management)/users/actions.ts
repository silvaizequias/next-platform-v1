'use server'

import { Session } from 'next-auth'
import {
  CreateUserDTO,
  CreateUserDTOType,
  UpdateUserDTO,
  UpdateUserDTOType,
} from './dto'
import { revalidatePath } from 'next/cache'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionGetUsers(session: Session) {
  try {
    const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })

    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionCreateUser(
  session: Session,
  inputs: CreateUserDTOType,
) {
  const randomCode = Math.random().toString(32).substr(2, 16)
  try {
    if (await CreateUserDTO.parseAsync(inputs)) {
      const setPassword = inputs?.password || randomCode
      const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({ ...inputs, password: setPassword }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      revalidatePath('/users')
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionUpdateUser(
  session: Session,
  inputs: UpdateUserDTOType,
  userId: string,
) {
  try {
    if (await UpdateUserDTO.parseAsync(inputs)) {
      const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      revalidatePath('/users')
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
