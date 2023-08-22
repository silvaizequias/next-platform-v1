'use client'

import { SessionProps } from '@/types'
import { Container, Typography } from '@mui/material'

export default function ManagerPage(props: SessionProps) {
  const { user }: any = props.session?.user

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
        {user?.name}
      </Typography>
    </Container>
  )
}
