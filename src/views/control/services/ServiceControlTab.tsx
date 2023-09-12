import { useFetch } from '@/hooks/useFetch'
import { Fab, Grid, Typography } from '@mui/material'
import { Suspense, useState } from 'react'
import { ServiceType } from './types'
import ServiceCard from './ServiceCard'
import { blue, green } from '@mui/material/colors'
import { MdOutlineAdd } from 'react-icons/md'
import ShowInDialog from '@/components/ShowInDialog'
import ServiceCreateForm from './forms/ServiceCreateForm'

export default function ServiceControlTab() {
  const { data: services, error, mutate } = useFetch(`/api/services`)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <Grid container spacing={2} marginTop={0}>
      <Grid item xs={12}>
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
        <Fab
          sx={{
            position: 'absolute',
            mb: 12,
            bottom: 20,
            right: 20,
            color: 'common.white',
            bgcolor: green[400],
            '&:hover': {
              bgcolor: green[600],
            },
            fontSize: 24,
          }}
          onClick={handleDialog}
        >
          <MdOutlineAdd />
        </Fab>
        <ShowInDialog
          open={openDialog}
          onClose={handleDialog}
          title='Adicionar Serviço'
        >
          <ServiceCreateForm onClose={handleDialog} />
        </ShowInDialog>
      </Grid>
    </Grid>
  )
}
