import { authOptions } from '@/libraries/next-auth'
import PasswordResetView from '@/views/auth/password-reset'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function PasswordResetPage() {
  const session = await getServerSession(authOptions)

  return !session ? <PasswordResetView /> : redirect('/')
}
