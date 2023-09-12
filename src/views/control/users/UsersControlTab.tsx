import { useFetch } from '@/hooks/useFetch'
import {
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardContent,
  Grid,
} from '@mui/material'
import { Suspense, useState } from 'react'
import UserDataGrid from './UserDataGrid'
import TableHeader from '@/components/TableHeader'
import ShowInDrawer from '@/components/ShowInDrawer'
import UserCreateForm from './forms/UserCreateForm'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { green } from '@mui/material/colors'

export default function UsersControlTab() {
  const { data: users, error, mutate } = useFetch(`/api/users`)

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Grid container spacing={2} marginTop={1}>
      <Grid item xs={12}>
        <Card>
          <TableHeader>
            <BottomNavigation>
              <BottomNavigationAction
                sx={{
                  color: green[400],
                  '&:hover': {
                    color: green[600],
                  },
                  fontSize: 24,
                }}
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
          </TableHeader>
          <CardContent>
            <Suspense fallback={'... carregando dados!'}>
              <UserDataGrid users={users} />
            </Suspense>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
