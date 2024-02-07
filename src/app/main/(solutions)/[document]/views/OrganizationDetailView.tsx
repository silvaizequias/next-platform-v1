'use client'

import { OrganizationType } from '@/app/main/(management)/organizations/types'
import { Box, Stack, Typography } from '@mui/material'
import MyOrganizationUsersListView from '../usuarios/views/MyOrganizationUsersListView'
import MyOrganizationSubscriptionsSpendingView from '../creditos/views/MyOrganizationSubscriptionsSpendingView'

interface Props {
  organization: OrganizationType | any
  spending: number | 0
}

export default function OrganizationDetailView(props: Props) {
  const { organization, spending } = props

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <MyOrganizationSubscriptionsSpendingView spending={spending} />
      <Stack alignContent={'center'} alignItems={'center'} spacing={2}>
        <Typography sx={{ textTransform: 'lowercase' }}>
          {`usuários da organização ${organization?.name}`}
        </Typography>
        <MyOrganizationUsersListView data={organization?.users} />
      </Stack>
    </Box>
  )
}
