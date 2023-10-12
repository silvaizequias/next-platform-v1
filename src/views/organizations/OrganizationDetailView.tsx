'use client'

import { useFetch } from '@/hooks/useFetch'
import { OrganizationDetailViewProps } from './types'
import { OrganizationType } from '@/types/organization'
import { Suspense } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import Spinner from '@/components/spinner'
import OrganizationLeftGrid from './OrganizationLeftGrid'
import OrganizationRightGrid from './OrganizationRightGrid'

export default function OrganizationDetailView(
  props: OrganizationDetailViewProps,
) {
  const { cnpj, session } = props
  const { data: organization } = useFetch<OrganizationType | undefined>(
    `/api/organizations/cnpj/${cnpj}`,
  )

  return (
    <Container maxWidth='xl'>
      <Suspense fallback={<Spinner />}>
        {session?.user?.id !== organization?.user?.id ? (
          <Grid container paddingTop={10} columnSpacing={2} rowGap={2}>
            <Grid item xs={12} sm={12}>
              <Typography variant='h4' textAlign={'center'}>
                Você não é dono desta organização ou ela ainda não existe em
                nosso sistema!
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container paddingTop={10} columnSpacing={2} rowGap={2}>
            <Grid item xs={12} sm={12} md={4}>
              <OrganizationLeftGrid organization={organization!} />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <OrganizationRightGrid organization={organization!} />
            </Grid>
          </Grid>
        )}
      </Suspense>
    </Container>
  )
}
