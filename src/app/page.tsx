import { authOptions } from '@/libraries/next-auth'
import AccountView from '@/views/account'
import LandingView from '@/views/landing'
import { getServerSession } from 'next-auth'

export default async function MainPage() {
  const session = await getServerSession(authOptions)

  return session ? <AccountView session={session} /> : <LandingView />
}
