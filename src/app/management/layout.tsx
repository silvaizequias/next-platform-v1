import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { Fragment, ReactNode } from 'react'

export default async function ManagementLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)
  return <Fragment>{children}</Fragment>
}
