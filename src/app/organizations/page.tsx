import { authOptions } from '@/libraries/next-auth'
import OrganizationsView from '@/views/organizations'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Organizações',
}
export default async function OrganizationPage() {
  const session = await getServerSession(authOptions)

  return session ? (
    <main>
      <OrganizationsView session={session!} />
    </main>
  ) : (
    redirect('/')
  )
}
