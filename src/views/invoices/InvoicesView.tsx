'use client'

import { useFetch } from '@/hooks/useFetch'
import { SessionProps } from '@/types'
import { InvoiceType } from './types'
import {
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardContent,
  Container,
  Grid,
} from '@mui/material'
import { MdAddBox } from 'react-icons/md'
import TableHeader from '@/components/TableHeader'
import { Suspense, useState } from 'react'
import InvoiceDataGrid from './InvoceDataGrid'
import ShowInDrawer from '@/components/ShowInDrawer'
import InvoiceCreateForm from './forms/InvoiceCreateForm'

export default function InvoicesView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const {
    data: invoices,
    error,
    mutate,
  } = useFetch<InvoiceType[]>(`/api/invoices`)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={6} marginTop={1}>
        <Grid item xs={12}>
          <Card>
            <TableHeader title={'Gestão de Pagamentos'}>
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
              title={'Criar Fatura'}
            >
              <InvoiceCreateForm onClose={handleDrawer} />
            </ShowInDrawer>
            <CardContent>
              <Suspense fallback={'... carregando dados!'}>
                <InvoiceDataGrid invoices={invoices!} />
              </Suspense>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
