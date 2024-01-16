import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import DomainScreen from './screen'

export default async function DomainPage() {
  const session = await getServerSession(nextAuthOptions)

  return <DomainScreen />
}
