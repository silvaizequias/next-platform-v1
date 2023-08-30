'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { ServiceType } from './types'
import {
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardContent,
  Container,
  Grid,
} from '@mui/material'
import TableHeader from '@/components/TableHeader'
import { MdAddBox } from 'react-icons/md'
import { Suspense, useState } from 'react'
import ServiceDataGrid from './ServiceDataGrid'
import ShowInDrawer from '@/components/ShowInDrawer'
import ServiceCreateForm from './forms/ServiceCreateForm'

export default function ServicesView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: services, error, mutate } = useFetch(`/api/services`)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={4} marginTop={1}>
        <Grid item xs={12}>
          <Card>
            <TableHeader title={'Gestão de Serviços'}>
              <BottomNavigation>
                <BottomNavigationAction
                  sx={{ fontSize: 24, color: 'green' }}
                  icon={<MdAddBox />}
                  onClick={handleDrawer}
                />
              </BottomNavigation>
            </TableHeader>
            <ShowInDrawer
              onClose={handleDrawer}
              open={openDrawer}
              title={'Criar Serviço'}
            >
              <ServiceCreateForm onClose={handleDrawer} />
            </ShowInDrawer>
            <CardContent>
              <Suspense fallback={'... carregando dados!'}>
                <ServiceDataGrid services={services!} />
              </Suspense>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
