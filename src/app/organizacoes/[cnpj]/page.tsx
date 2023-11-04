import { authOptions } from '@/libraries/next-auth'
import OrganizationDetailView from '@/views/organizations/OrganizationDetailView'
import { getServerSession } from 'next-auth'

export default async function OrganizationDetailPage() {
  const session = await getServerSession(authOptions)

  return <OrganizationDetailView />
}
