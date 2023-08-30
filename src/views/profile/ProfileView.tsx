'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Container, Grid } from '@mui/material'
import ProfileLeftView from './ProfileLeftView'
import ProfileRightView from './ProfileRightView'

export default function ProfileView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: profile, error, mutate } = useFetch(`/api/profile/${user?.id}`)

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={6} marginTop={1}>
        <Grid item xs={12} sm={4}>
          <ProfileLeftView profile={profile} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <ProfileRightView profile={profile} />
        </Grid>
      </Grid>
    </Container>
  )
}
