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
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}

export async function actionCreateUser(
  session: Session,
  inputs: CreateUserDTOType,
) {
  try {
    if (await CreateUserDTO.parseAsync(inputs)) {
      const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/users`, {
        method: 'POST',
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
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}

export async function actionUpdateUser(
  session: Session,
  inputs: UpdateUserDTOType,
  id: string,
) {
  try {
    if (await UpdateUserDTO.parseAsync(inputs)) {
      const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/users/${id}`, {
        method: 'PATH',
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
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}
