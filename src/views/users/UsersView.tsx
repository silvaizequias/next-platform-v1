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

export default function UsersView(props: SessionProps) {
  const { user }: any = props?.session?.user
  const { data: users, error, mutate } = useFetch(`/api/users`)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12}>
          <Card>
            <TableHeader title={'Gestão de Usuários'}>
              <BottomNavigation>
                <BottomNavigationAction
                  sx={{ fontSize: 24, color: 'green' }}
                  icon={<MdPersonAddAlt1 />}
                  onClick={handleDrawer}
                />
              </BottomNavigation>
            </TableHeader>
            <ShowInDrawer
              onClose={handleDrawer}
              open={openDrawer}
              title={'Criar Usuário'}
            >
              <UserCreateForm onClose={handleDrawer} />
            </ShowInDrawer>
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
