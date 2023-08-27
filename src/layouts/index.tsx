'use client'

import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import AppBarLayout from './components/AppBarLayout'
import { LayoutProps } from '@/types'
import ContentLayout from './components/ContentLayout'
import Spinner from '@/components/Spinner'

export default function AppLayout(props: LayoutProps) {
  const { children } = props
  const { data: session, status } = useSession()

  return status === 'loading' ? (
    <Spinner />
  ) : (
    <Fragment>
      {status === 'authenticated' && <AppBarLayout session={session} />}
      <ContentLayout>{children}</ContentLayout>
    </Fragment>
  )
}
