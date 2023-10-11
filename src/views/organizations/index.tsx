'use client'

import { useFetch } from '@/hooks/useFetch'
import { PageViewProps } from '@/layouts/types'
import { UserType } from '@/types/user'
import { Container, Grid } from '@mui/material'
import OrganizationTab from './tabs'

export default function OrganizationsView(props: PageViewProps) {
  const { session } = props
  const userId = session?.user?.id!
  const { data: user } = useFetch<UserType | undefined>(`/api/users/${userId}`)

  return (
    <Container maxWidth='xl'>
      <Grid container paddingTop={10} columnSpacing={2} rowGap={2}>
        <Grid item xs={12} sm={12}>
          <OrganizationTab user={user!} />
        </Grid>
      </Grid>
    </Container>
  )
}
