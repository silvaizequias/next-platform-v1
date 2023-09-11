'use client'

import { useFetch } from '@/hooks/useFetch'
import { PageViewProps } from '@/types'
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { SubscriptionType } from '../control/subscriptions/types'
import { UserType } from '../control/users/types'
import { Fragment, Suspense } from 'react'
import Spinner from '@/components/Spinner'
import ShowServices from './ShowServices'
import { blue } from '@mui/material/colors'
import { MdBlurOn } from 'react-icons/md'
import ShowSubscriptions from './ShowSubscriptions'
import { ServiceType } from '../control/services/types'

export default function AccountView(props: PageViewProps) {
  const { data: user } = useFetch<UserType>(
    `/api/users/${props.session?.user?.id}`,
  )
  const { data: services } = useFetch<any>(`/api/services`)

  const subscriptions = user?.subscriptions.filter(
    (subscriptions: SubscriptionType) => {
      return subscriptions
    },
  )

  //TODOS: listar apenas os serviços não contratados

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Suspense fallback={<Spinner />}>
          {subscriptions?.length !== 0 ? (
            <Fragment>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant='h6'
                  color={blue[600]}
                  textTransform={'uppercase'}
                  textAlign={'center'}
                  fontWeight={200}
                >
                  Minhas Contratações
                </Typography>
              </Grid>

              {subscriptions?.map((subscription: SubscriptionType) => (
                <Grid key={subscription?.id!} item xs={12} sm={6} md={3}>
                  <ShowSubscriptions id={subscription?.id!} />
                </Grid>
              ))}
            </Fragment>
          ) : (
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
              <Divider sx={{ display: 'flex', mx: 8, my: 2, color: blue[600] }}>
                <MdBlurOn size={24} />
              </Divider>
            </Grid>
          )}
        </Suspense>
      </Grid>
      <Grid container spacing={2} marginTop={1}>
        <Suspense fallback={<Spinner />}>
          {services?.map(
            (service: ServiceType) =>
              service?.isAvaliable && (
                <Grid key={service?.id!} item xs={12} sm={6} md={3}>
                  <ShowServices service={service!} user={user!} />
                </Grid>
              ),
          )}
        </Suspense>
      </Grid>
    </Container>
  )
}
