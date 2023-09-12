import { authOptions } from '@/libraries/next-auth'
import { LayoutProps } from '@/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export default async function DrivingLayout(props: LayoutProps) {
  const { children } = props
  const session = await getServerSession(authOptions)

  return session && session.user.role !== 'GUEST' ? (
    <Fragment>{children}</Fragment>
  ) : (
    redirect('/')
  )
}
