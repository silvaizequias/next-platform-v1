import { authOptions } from '@/libraries/next-auth'
import ServiceView from '@/views/services'
import { getServerSession } from 'next-auth'

export default async function ServicePage() {
  const session = await getServerSession(authOptions)

  return <ServiceView session={session!} />
}
