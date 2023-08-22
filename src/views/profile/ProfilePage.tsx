'use client'

import { useFetch } from '@/hooks/useFetch'
import { ProfileType } from './types'
import { SessionProps } from '@/types'
import { Container, Typography } from '@mui/material'

export default function ProfilePage(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: profile, error, mutate } = useFetch<ProfileType>(
    `/api/profile/${user?.id}`,
  )

  return (
    <Container
      disableGutters
      maxWidth='sm'
      component='main'
      sx={{ pt: 12, pb: 4 }}
    >
      <Typography
        variant='h5'
        align='center'
        color='text.secondary'
        component='p'
      >
        {profile?.name}
      </Typography>
    </Container>
  )
}
