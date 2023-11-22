import UnauthorizedAccess from '@/components/unauthorized-access'
import { authOptions } from '@/libraries/next-auth'
import OrganizationView from '@/views/organizations'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Organizações do Sistema',
}

export default async function OrganizationPage() {
  const session = await getServerSession(authOptions)

  return session ? (
    <Fragment>
      {session.user?.profile == 'MASTER' ? (
        <OrganizationView session={session} />
      ) : (
        <UnauthorizedAccess />
      )}
    </Fragment>
  ) : (
    redirect('/')
  )
}
