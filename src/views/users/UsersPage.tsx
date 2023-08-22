'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Fragment } from 'react'


export default function UsersPage(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: users, error, mutate } = useFetch(`/api/users`)

  return <Fragment>{users}</Fragment>
}
