import { ApiKeyType } from '@/types/api-key'
import { HandleAuthorizationsProps } from '@/types/helpers'
import { UserType } from '@/types/user'
import jwt from 'jsonwebtoken'

export const handleAuthorizations = async (
  props: HandleAuthorizationsProps,
) => {
  const { authorization, method } = props
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

  if (authorization?.includes('Bearer ')) {
    const token = authorization.split('Bearer ')[1]
    const decriptedToken: any = jwt.decode(token)
    const userId: string = decriptedToken?.id

    const user: UserType = await (
      await fetch(`${NEXTAUTH_URL}/api/users/${userId}`)
    ).json()

    if (user) return true
  }

  const apiKey: ApiKeyType = await (
    await fetch(`${NEXTAUTH_URL}/api/key-validation/${authorization}`)
  ).json()

  if (apiKey) return true

  return false
}
