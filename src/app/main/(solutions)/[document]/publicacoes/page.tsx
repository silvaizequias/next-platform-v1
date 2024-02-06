import { OrganizationType } from '@/app/main/(management)/organizations/types'
import { nextAuthOptions } from '@/libraries/next-auth'
import { Grid, Stack, Typography, Paper } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { actionGetOrganizationByDocument } from '../actions'
import { PublicationType } from '@/app/main/(management)/publications/types'
import { actionGetMyOrganizationPublications } from './actions'
import MyOrganizationPublicationsListView from './views/MyOrganizationPublicationsListView'

export const metadata: Metadata = {
  title: {
    default: 'publicações da minha organização',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MyOrganizationPublicationsPage({
  params,
}: {
  params: { document: string }
}) {
  const session = await getServerSession(nextAuthOptions)
  const { document } = params
  const organization: OrganizationType = await actionGetOrganizationByDocument(
    document,
    session!,
  )
  const publications: PublicationType[] | any =
    await actionGetMyOrganizationPublications(
      organization?.authorizationKey?.authorizationKey,
      organization?.document,
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
            {`publicações da organização ${organization?.name}`}
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
          <MyOrganizationPublicationsListView publications={publications} />
        </Stack>
      </Grid>
    </Grid>
  )
}
