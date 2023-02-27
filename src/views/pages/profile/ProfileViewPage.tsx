import { Grid } from '@mui/material'
import { useSession } from 'next-auth/react'

import ProfileViewLeft from './ProfileViewLeft'
import ProfileViewRight from './ProfileViewRight'

type Props = {
  tab: string
}

export default function ProfileViewPage({ tab }: Props) {
  const { data: session } = useSession()

  return session ? (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <ProfileViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <ProfileViewRight tab={tab} />
      </Grid>
    </Grid>
  ) : null
}
