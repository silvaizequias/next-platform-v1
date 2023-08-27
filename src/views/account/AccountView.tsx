'use client'

import { SessionProps } from '@/types'
import { Container } from '@mui/material'

export default function AccountView(props: SessionProps) {
  const { user }: any = props.session?.user

  return (
    <Container maxWidth="xl">
      {user?.name}
    </Container>
  )
}
