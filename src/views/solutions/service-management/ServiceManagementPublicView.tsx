'use client'

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { Fragment } from 'react'

export default function ServiceManagementPublicView() {
  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '100vw',
          minHeight: 290,
          bgcolor: blue[600],
          backgroundBlendMode: 'multiply',
          backgroundImage: `url('/backgrounds/bg-service-management.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Container
          maxWidth='lg'
          sx={{
            alignContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: 2
          }}
        >
          <Typography
            variant='h2'
            fontWeight='600'
            textTransform='uppercase'
            color={grey[50]}
            paddingX={2}
          >
            Gestão de Serviços
          </Typography>
          <Divider
            sx={{
              color: grey[100],
              m: 2,
              fontWeight: '500',
            }}
          >
            Acompanhamento em tempo real de demandas em campo
          </Divider>
          <Button size='medium' color='success' variant='contained'>
            Solicite uma Demonstração
          </Button>
        </Container>
      </Box>
      <Container maxWidth='xl'>
        <Grid container spacing={2} marginTop={0}></Grid>
      </Container>
    </Fragment>
  )
}
