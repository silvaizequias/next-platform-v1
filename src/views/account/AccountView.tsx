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
import { SubscriptionType } from '../subscriptions/types'

export default function AccountView(props: SessionProps) {
  const { data: user } = useFetch<UserType>(
    `/api/users/${props.session?.user?.id}`,
  )

  const subscriptions = user?.subscriptions.filter(
    (subscriptions: SubscriptionType) => {
      return subscriptions
    },
  )

  //TODO: melhorar lógica de listagem de serviços já contratados
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Suspense fallback={<Spinner />}>
          {subscriptions?.length == 0 ? (
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
            <Fragment>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant='body1'
                  color={blue[600]}
                  textTransform={'uppercase'}
                  fontWeight={400}
                >
                  Minhas Contratações
                </Typography>
              </Grid>
              {subscriptions?.map((subscription: SubscriptionType) => (
                <Grid key={subscription?.id} item xs={12} sm={6} md={3}>
                  <ShowServicesSubscriptionBox id={subscription?.id!} />
                </Grid>
              ))}
              <Grid item xs={12} sm={12}>
                <Divider
                  sx={{ display: 'flex', mx: 8, my: 2, color: blue[600] }}
                >
                  <MdBlurOn size={24} />
                </Divider>
                <Typography
                  variant='body1'
                  color={blue[600]}
                  textTransform={'uppercase'}
                  fontWeight={500}
                >
                  Contratar Novo Serviço
                </Typography>
              </Grid>
              <ShowServicesBox user={user!} />
            </Fragment>
          )}
        </Suspense>
      </Grid>
    </Container>
  )
}
