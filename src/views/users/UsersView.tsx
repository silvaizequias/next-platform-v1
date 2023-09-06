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
} from '@mui/material'
import UserDataGrid from './UserDataGrid'
import TableHeader from '@/components/TableHeader'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { Suspense, useState } from 'react'
import ShowInDrawer from '@/components/ShowInDrawer'
import UserCreateForm from './forms/UserCreateForm'
import PageHeader from '@/components/PageHeader'

export default function UsersView(props: SessionProps) {
  const { data: users, error, mutate } = useFetch(`/api/users`)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12}>
          <PageHeader title='Gestão de Usuários'>
            <BottomNavigation>
              <BottomNavigationAction
                sx={{ fontSize: 24, color: 'green' }}
                icon={<MdPersonAddAlt1 />}
                onClick={handleDrawer}
              />
            </BottomNavigation>
            <ShowInDrawer
              onClose={handleDrawer}
              open={openDrawer}
              title={'Criar Usuário'}
            >
              <UserCreateForm onClose={handleDrawer} />
            </ShowInDrawer>
          </PageHeader>
          <Card>
            <CardContent>
              <Suspense fallback={'... carregando dados!'}>
                <UserDataGrid users={users} />
              </Suspense>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
