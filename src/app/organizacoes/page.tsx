import { authOptions } from '@/libraries/next-auth'
import OrganizationView from '@/views/organizations'
import { getServerSession } from 'next-auth'

export default async function OrganizationPage() {
  const session = await getServerSession(authOptions)

  return <OrganizationView />
}
