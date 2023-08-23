'use client'

import { SessionProps } from '@/types'
import { Fragment } from 'react'

export default function AccountView(props: SessionProps) {
  const { user }: any = props.session?.user

  return (
    <Fragment>
      {user?.name}
    </Fragment>
  )
}
