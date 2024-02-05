import { nextAuthOptions } from '@/libraries/next-auth'
import { Grid, Stack, Typography, Paper } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { actionGetOrganizationUsers } from './actions'
import { OrganizationUsersType } from './types'
import OrganizationUsersListView from './views/OrganizationUsersListView'

export const metadata: Metadata = {
  title: {
    default: 'gestão de usuários nas organizações da plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function OrganizationUsersManagementPage() {
  const session = await getServerSession(nextAuthOptions)
  const organizationUsers: OrganizationUsersType[] | any =
    await actionGetOrganizationUsers(session!)

  return session ? (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        sx={{
          minHeight: 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: 4,
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            align="center"
            fontWeight={600}
            color={blue[400]}
          >
            gestão de usuários nas organizações da plataforma
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={6}
        square
        sx={{ height: '100vh' }}
      >
        <Stack gap={2} alignContent={'center'} alignItems={'center'}>
          <OrganizationUsersListView organizationUsers={organizationUsers} />
        </Stack>
      </Grid>
    </Grid>
  ) : (
    redirect('/')
  )
}
