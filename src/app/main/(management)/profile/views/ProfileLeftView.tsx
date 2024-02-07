'use client'

import { Avatar, Chip, Stack } from '@mui/material'
import { UserType } from '../../users/types'

interface Props {
  profile: UserType | any
}

export default function ProfileLeftView(props: Props) {
  const { profile } = props

  const avatar = '/avatar.svg'

  return (
    <Stack spacing={2} display={'flex'} justifyItems={'cenre'} alignItems={'center'}>
      <Avatar
        alt={profile?.name}
        src={profile?.image || avatar}
        variant="rounded"
        sx={{
          width: 120,
          height: 120,
          padding: 1,
          boxShadow: 1,
          cursor: 'pointer',
        }}
      />
      <Chip label={profile?.profile} color='success' variant="outlined" size='small' />
    </Stack>
  )
}
