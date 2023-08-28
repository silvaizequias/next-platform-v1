'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Container, Grid } from '@mui/material'
import ProfileLeftView from './ProfileLeftView'

export default function ProfileView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: profile, error, mutate } = useFetch(`/api/profile/${user?.id}`)

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={6} marginTop={1}>
        <Grid item xs={4}>
          <ProfileLeftView profile={profile} />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Container>
  )
}
