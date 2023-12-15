import { authOptions } from '@/libraries/next-auth'
import LandingView from '@/views/landing'
import { getServerSession } from 'next-auth'

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  return <LandingView />
}
