'use client'

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
import { MdAddBox } from 'react-icons/md'
import { Suspense, useState } from 'react'
import ShowInDrawer from '@/components/ShowInDrawer'
import ServiceCreateForm from './forms/ServiceCreateForm'
import { blue } from '@mui/material/colors'
import PageHeader from '@/components/PageHeader'
import ServiceCard from './ServiceCard'
import { ServiceType } from './types'

export default function ServicesView(props: PageViewProps) {
  const { data: services, error, mutate } = useFetch(`/api/services`)
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
              title={'Criar Serviço'}
            >
              <ServiceCreateForm onClose={handleDrawer} />
            </ShowInDrawer>
          </PageHeader>
        </Grid>
        {services?.length! > 0 ? (
          <Suspense fallback={'... carregando dados!'}>
            {services?.map((service: ServiceType) => (
              <Grid key={service?.id!} item xs={12} sm={6} md={3}>
                <ServiceCard service={service} />
              </Grid>
            ))}
          </Suspense>
        ) : (
          <Grid item xs={12}>
            <Typography
              variant={'h5'}
              textAlign={'center'}
              color={blue[600]}
              textTransform={'capitalize'}
            >
              Sem serviços para listar!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
