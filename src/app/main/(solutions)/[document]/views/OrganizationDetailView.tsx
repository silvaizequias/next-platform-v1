'use client'

import { OrganizationType } from '@/app/main/(management)/organizations/types'
import { Box, Stack, Typography } from '@mui/material'
import MyOrganizationUsersListView from '../usuarios/views/MyOrganizationUsersListView'
import { OrganizationUsersType } from '@/app/main/(management)/organizations/users/types'
import { orange } from '@mui/material/colors'
import { Session } from 'next-auth'

interface Props {
  organization: OrganizationType | any
  session: Session
}

export default function OrganizationDetailView(props: Props) {
  const { organization, session } = props

  const organizationUser =
    session &&
    organization?.users?.find(
      (users: OrganizationUsersType) =>
        users?.user?.id === session?.user?.id &&
        users?.role.includes('owner' || 'administrator'),
    )

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <Stack alignContent={'center'} alignItems={'center'} spacing={2}>
        <Typography sx={{ textTransform: 'lowercase' }}>
          {`usuários da organização ${organization?.name}`}
        </Typography>
        {organizationUser ? (
          <MyOrganizationUsersListView data={organization?.users} />
        ) : (
          <Typography
            component={'small'}
            variant="caption"
            sx={{
              textTransform: 'lowercase',
              textAlign: 'center',
              color: orange[400],
            }}
          >
            {`sua função na organização ${organization?.name} não permite visualizar essa informação`}
          </Typography>
        )}
      </Stack>
    </Box>
  )
}
