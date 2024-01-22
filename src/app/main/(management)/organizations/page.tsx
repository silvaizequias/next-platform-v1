import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import OrganizationScreen from './screen'

export default async function OrganizationPage() {
  const session = await getServerSession(nextAuthOptions)

  return <OrganizationScreen />
}
