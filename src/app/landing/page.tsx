import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import LandingScreen from './screen'

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  return <LandingScreen />
}
