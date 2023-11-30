import { authOptions } from '@/libraries/next-auth'
import SignUpForm from '@/views/auth/sign-up/SignUpForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  return !session ? <SignUpForm /> : redirect('/')
}
