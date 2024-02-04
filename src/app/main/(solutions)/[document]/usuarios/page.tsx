import { OrganizationType } from '@/app/main/(management)/organizations/types'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Grid, Stack, Typography, Paper } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { actionGetOrganizationByDocument } from '../actions'
import MyOrganizationUsersListView from './views/MyOrganizationUsersListView'

export const metadata: Metadata = {
  title: {
    default: 'usuários da minha organização',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MyOrganizationUsersPage({
  params,
}: {
  params: { document: string }
}) {
  const { document } = params
  const session = await getServerSession(nextAuthOptions)
  const organization: OrganizationType = await actionGetOrganizationByDocument(
    document,
    session!,
  )

  return (
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
            {`usuários da organização ${organization?.name}`}
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
          <MyOrganizationUsersListView
            data={organization?.users}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}
