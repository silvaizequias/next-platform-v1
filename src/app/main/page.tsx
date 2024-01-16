import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/libraries/next-auth'
import MainScreen from './screen'

export default async function MainPage() {
  const session = await getServerSession(nextAuthOptions)

  return <MainScreen session={session!} />
}
