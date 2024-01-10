import { getServerSession } from 'next-auth'
import { actionGetUsers } from './actions'
import UserScreen from './screen'
import { nextAuthOptions } from '@/libraries/next-auth'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export default async function UserPage() {
  const session = await getServerSession(nextAuthOptions)
  const users = await actionGetUsers()

  return session ? (
    <Fragment>
      <UserScreen users={users} />
    </Fragment>
  ) : (
    redirect('/')
  )
}
