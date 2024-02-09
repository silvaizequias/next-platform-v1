'use client'

import { Grid, Box } from '@mui/material'
import { UserType } from '../../users/types'
import ProfileLeftView from './ProfileLeftView'
import ProfileRightView from './ProfileRightView'

interface Props {
  profile: UserType | any
}

export default function ProfileView(props: Props) {
  const { profile } = props

  return (
    <Grid
      container
      sx={{ display: 'flex', maxWidth: 'md', width: '100%' }}
      rowGap={2}
      spacing={4}
    >
      <Grid item xs={12} sm={2}>
        <Box sx={{ width: '100%' }}>
          <ProfileLeftView profile={profile} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Box sx={{ width: '100%' }}>
          <ProfileRightView profile={profile} />
        </Box>
      </Grid>
    </Grid>
  )
}
