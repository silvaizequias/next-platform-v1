'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import { UserType } from '@/types/user'
import { getServerSession } from 'next-auth'

export const getUsers = async (): Promise<UserType[] | any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const getUserByDocument = async (
  document: string,
): Promise<UserType | any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/users/document/${document}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const getUserByEmail = async (
  email: string,
): Promise<UserType | any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/users/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const getUserById = async (id: string): Promise<UserType | any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const getUserByPhone = async (
  phone: string,
): Promise<UserType | any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/users/phone/${phone}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}
