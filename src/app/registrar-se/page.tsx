import { authOptions } from '@/libraries/next-auth'
import SignInView from '@/views/auth/sign-in'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  return !session ? <SignInView /> : redirect('/')
}
