import { useFetch } from '@/hooks/useFetch'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Suspense } from 'react'
import SubscriptionDataGrid from './SubscriptionDataGrid'
import { blue } from '@mui/material/colors'

export default function SubscriptionsControlTab() {
  const { data: subscriptions, error, mutate } = useFetch(`/api/subscriptions`)

  return (
    <Grid container spacing={2} marginTop={0}>
      <Grid item xs={12}>
        <Card elevation={0}>
          <CardContent>
            {subscriptions?.length! > 0 ? (
              <Suspense fallback={'... carregando dados!'}>
                <SubscriptionDataGrid subscriptions={subscriptions!} />
              </Suspense>
            ) : (
              <Typography
                variant={'h5'}
                textAlign={'center'}
                color={blue[600]}
                textTransform={'capitalize'}
              >
                Sem contratações para listar!
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
