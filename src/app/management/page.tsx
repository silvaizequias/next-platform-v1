import { getServerSession } from 'next-auth'
import ManagementScreen from './screen'
import { nextAuthOptions } from '@/libraries/next-auth'

export default async function ManagementPage() {
  const session = await getServerSession(nextAuthOptions)
  return <ManagementScreen session={session!} />
}
