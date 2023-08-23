'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Fragment } from 'react'


export default function UsersView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: users, error, mutate } = useFetch(`/api/users`)

  return <Fragment>{user?.name}</Fragment>
}
