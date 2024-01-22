import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import OrganizationScreen from './screen'
import { redirect } from 'next/navigation'

export default async function OrganizationPage() {
  const session = await getServerSession(nextAuthOptions)

  return session ? <OrganizationScreen /> : redirect('/')
}
