'use client'

import TableHeader from '@/components/TableHeader'
import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import {
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardContent,
  Container,
  Grid,
} from '@mui/material'
import { MdAddBox } from 'react-icons/md'
import ContractDataGrid from './ContractDataGrid'
import { Suspense, useState } from 'react'
import ShowInDrawer from '@/components/ShowInDrawer'
import ContractCreateForm from './forms/ContractCreateForm'

export default function ContractsView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: contracts, error, mutate } = useFetch(`/api/contracts`)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={6} marginTop={1}>
        <Grid item xs={12}>
          <Card>
            <TableHeader title={'Gestão de Contratos'}>
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
              title={'Criar Contrato'}
            >
              <ContractCreateForm />
            </ShowInDrawer>
            <CardContent>
              <Suspense fallback={'... carregando dados!'}>
                <ContractDataGrid contracts={contracts!} />
              </Suspense>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
