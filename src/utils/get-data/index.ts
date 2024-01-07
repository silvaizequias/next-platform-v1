import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
const CONTENT_API_URL = process.env.CONTENT_API_URL!
const PLATFORM_API_URL = process.env.PLATFORM_API_URL!

export const getPosts = async () => {
  const data = await fetch(`${CONTENT_API_URL}/posts`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 3600 },
  })
  return data && data.json()
}

export const getProfile = async () => {
  const session = await getServerSession(authOptions)

  if (!session) return null

  const data = await fetch(`${PLATFORM_API_URL}/users/${session.user.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${session.user.authorization}`,
    },
  })
  return data && data.json()
}
