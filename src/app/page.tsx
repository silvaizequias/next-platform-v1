import { authOptions } from '@/libraries/next-auth'
import AccountView from '@/views/account/AccountView'
import AuthView from '@/views/auth/AuthView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function Account() {
  const session = await getServerSession(authOptions)

  return (
    <main>{session ? <AccountView session={session!} /> : <AuthView />}</main>
  )
}
