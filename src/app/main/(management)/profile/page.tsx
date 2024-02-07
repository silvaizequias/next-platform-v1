import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { UserType } from '../users/types'
import { actionGetProfile } from './actions'
import PageDisplay from '@/components/PageDisplay'
import { Box, Grid } from '@mui/material'
import ProfileRightView from './views/ProfileRightView'
import ProfileLeftView from './views/ProfileLeftView'

export const metadata: Metadata = {
  title: {
    default: 'meu perfil na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions)
  const profile: UserType | any = await actionGetProfile(session!)

  return session ? (
    <PageDisplay
      title="meu perfil na plataforma"
      subtitle={`olá ${profile?.name.split(' ')[0]}`}
    >
      <Grid
        container
        component="div"
        sx={{ display: 'flex', maxWidth: 'md', width: '100%' }}
        rowGap={2} spacing={4}
      >
        <Grid item xs={12} sm={2}>
          <Box
            sx={{ width: '100%'}}
          >
            <ProfileLeftView profile={profile} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Box sx={{ width: '100%' }}>
            <ProfileRightView profile={profile} />
          </Box>
        </Grid>
      </Grid>
    </PageDisplay>
  ) : (
    redirect('/')
  )
}
