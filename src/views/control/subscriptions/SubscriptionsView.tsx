'use client'

import ShowInDrawer from '@/components/ShowInDrawer'
import { useFetch } from '@/hooks/useFetch'
import { PageViewProps } from '@/types'
import {
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { Suspense, useState } from 'react'
import { MdAddBox } from 'react-icons/md'
import SubscriptionCreateForm from './forms/SubscriptionCreateForm'
import SubscriptionDataGrid from './SubscriptionDataGrid'
import { blue } from '@mui/material/colors'
import PageHeader from '@/components/PageHeader'

export default function SubscriptionsView(props: PageViewProps) {
  const { data: subscriptions, error, mutate } = useFetch(`/api/subscriptions`)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12}>
          <PageHeader metadata={props.metadata!}>
            <BottomNavigation>
              <BottomNavigationAction
                sx={{ fontSize: 24, color: 'green' }}
                icon={<MdAddBox />}
                onClick={handleDrawer}
              />
            </BottomNavigation>
            <ShowInDrawer
              onClose={handleDrawer}
              open={openDrawer}
              title={'Atribuir Contratação'}
            >
              <SubscriptionCreateForm onClose={handleDrawer} />
            </ShowInDrawer>
          </PageHeader>
        </Grid>
        <Grid item xs={12}>
          <Card>
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
    </Container>
  )
}
