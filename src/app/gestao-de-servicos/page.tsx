import { authOptions } from '@/libraries/next-auth'
import ServiceManagementsView from '@/views/service-managements'
import { getServerSession } from 'next-auth'

export default async function ServiceManagementsPage() {
  const session = await getServerSession(authOptions)

  return <ServiceManagementsView session={session!} />
}
