'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { UserType } from '../users/types'
import { Fragment, Suspense } from 'react'
import Spinner from '@/components/Spinner'
import { blue } from '@mui/material/colors'
import ShowServicesBox from './ShowServicesBox'
import { MdBlurOn } from 'react-icons/md'
import ShowServicesSubscriptionBox from './ShowServicesSubscriptionsBox'

export default function AccountView(props: SessionProps) {
  const { data: user } = useFetch<UserType>(
    `/api/users/${props.session?.user?.id}`,
  )

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Suspense fallback={<Spinner />}>
          {user?.subscriptions?.length == 0 ? (
            <Fragment>
              <Grid item xs={12} sm={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: blue[600],
                    textAlign: 'center',
                  }}
                >
                  <Typography variant='h4' fontWeight={'400'}>
                    {user?.name.split(' ')[0]}
                  </Typography>
                  <Typography
                    variant='h6'
                    textTransform={'uppercase'}
                    fontWeight={'200'}
                  >
                    você ainda não contratou nenhum serviço?
                  </Typography>
                </Box>
                <Divider
                  sx={{ display: 'flex', mx: 8, my: 2, color: blue[600] }}
                >
                  <MdBlurOn size={24} />
                </Divider>
              </Grid>
              <ShowServicesBox user={user} />
            </Fragment>
          ) : (
            <ShowServicesSubscriptionBox user={user} />
          )}
        </Suspense>
      </Grid>
    </Container>
  )
}
