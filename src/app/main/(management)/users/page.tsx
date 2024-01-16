import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import UserScreen from './screen'

export default async function UserPage() {
  const session = await getServerSession(nextAuthOptions)

  return <UserScreen />
}
