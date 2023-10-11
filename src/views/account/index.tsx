'use client'

import { PageViewProps } from '@/layouts/types'
import { Container, Grid } from '@mui/material'
import AccountHeaderView from './AccountHeaderView'
import { useFetch } from '@/hooks/useFetch'
import { UserType } from '@/types/user'

export default function AccountView(props: PageViewProps) {
  const { session } = props
  const userId = session?.user?.id!
  const { data: user, mutate } = useFetch<UserType | undefined>(
    `/api/users/${userId}`,
  )

  return (
    <Container maxWidth='xl'>
      <Grid container paddingTop={10} columnSpacing={2} rowGap={2}>
        <Grid item xs={12} sm={12}>
          <AccountHeaderView user={user!} />
        </Grid>
      </Grid>
    </Container>
  )
}
