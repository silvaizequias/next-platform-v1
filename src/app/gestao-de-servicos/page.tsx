import { authOptions } from '@/libraries/next-auth'
import ServiceManagementView from '@/views/service-management'
import { getServerSession } from 'next-auth'

export default async function ServiceManagementPage() {
  const session = await getServerSession(authOptions)
  
  return <ServiceManagementView />
}
