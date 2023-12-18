import { getServerSession } from 'next-auth'
import MainScreen from './screen'
import { authOptions } from '@/libraries/next-auth'

export default async function MainPage() {
  const session = await getServerSession(authOptions)

  return <MainScreen />
}
