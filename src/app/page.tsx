import { authOptions } from '@/libraries/next-auth'
import AccountPage from '@/pages/account/AccountPage'
import AuthPage from '@/pages/auth/AuthPage'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function Account() {
  const session = await getServerSession(authOptions)

  return session ? <AccountPage session={session!} /> : <AuthPage />
}
