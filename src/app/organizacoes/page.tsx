import { authOptions } from '@/libraries/next-auth'
import OrganizationView from '@/views/organizations'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function OrganizationPage() {
  const session = await getServerSession(authOptions)

  return session ? <OrganizationView session={session} /> : redirect('/')
}
