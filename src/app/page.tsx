import { authOptions } from '@/libraries/next-auth'
import AccountView from '@/views/account/AccountView'
import LandingView from '@/views/landing/LandingView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Sistema Personalizado de Alta Performance',
}

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      {session ? (
        <AccountView metadata={metadata} session={session!} />
      ) : (
        <LandingView />
      )}
    </main>
  )
}
