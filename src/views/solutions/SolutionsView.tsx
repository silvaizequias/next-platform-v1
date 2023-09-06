'use client'

import ShowInDrawer from '@/components/ShowInDrawer'
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
import { Suspense, useState } from 'react'
import { MdAddBox } from 'react-icons/md'
import SolutionCreateForm from './forms/SolutionCreateForm'
import { blue } from '@mui/material/colors'
import PageHeader from '@/components/PageHeader'

export default function SolutionsView(props: SessionProps) {
  const { data: solutions, error, mutate } = useFetch(`/api/solutions`)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12}>
          <PageHeader title='Gestão de Soluções'>
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
              title={'Criar Solução'}
            >
              <SolutionCreateForm onClose={handleDrawer} />
            </ShowInDrawer>
          </PageHeader>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {solutions?.length! > 0 ? (
                <Suspense fallback={'... carregando dados!'}></Suspense>
              ) : (
                <Typography
                  variant={'h5'}
                  textAlign={'center'}
                  color={blue[600]}
                  textTransform={'capitalize'}
                >
                  Sem soluções para listar!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
