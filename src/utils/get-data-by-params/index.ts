import { Session } from 'next-auth'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
const PLATFORM_API_URL = process.env.PLATFORM_API_URL!

export const getPostByParams = async (slug: string) => {
  if (!slug) return null

  const data = await fetch(`${NEXTAUTH_URL}/api/posts/slug/${slug}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 3600 },
  })
  return data && data.json()
}

export const getProfileBySession = async (session: Session) => {
  if (!session) return null

  const data = await fetch(`${PLATFORM_API_URL}/users/${session.user.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${session.user.authorization}`,
    },
    next: { revalidate: 3600 },
  })
  return data && data.json()
}
