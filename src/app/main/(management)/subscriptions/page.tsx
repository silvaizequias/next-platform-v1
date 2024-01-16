import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import SubscriptionScreen from './screen'

export default async function SubscriptionPage() {
  const session = await getServerSession(nextAuthOptions)

  return <SubscriptionScreen />
}
