import UnauthorizedAccess from '@/components/unauthorized-access'
import { authOptions } from '@/libraries/next-auth'
import UserView from '@/views/users'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Usuários do Sistema',
}

export default async function UserPage() {
  const session = await getServerSession(authOptions)

  return session ? (
    <Fragment>
      {session.user?.profile === 'MASTER' ? (
        <UserView session={session} />
      ) : (
        <UnauthorizedAccess />
      )}
    </Fragment>
  ) : (
    redirect('/')
  )
}
