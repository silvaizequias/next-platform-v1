'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
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

export default function ServicesView(props: SessionProps) {
  const { data: services, error, mutate } = useFetch(`/api/services`)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12}>
          <PageHeader title='Gestão de Serviços'>
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
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {services?.length! > 0 ? (
                <Suspense fallback={'... carregando dados!'}></Suspense>
              ) : (
                <Typography
                  variant={'h5'}
                  textAlign={'center'}
                  color={blue[600]}
                  textTransform={'capitalize'}
                >
                  Sem serviços para listar!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
