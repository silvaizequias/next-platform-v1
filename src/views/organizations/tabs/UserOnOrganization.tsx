import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import { UserOnOrganizationProps } from '../types'
import { OrganizationType } from '@/types/organization'
import { blue } from '@mui/material/colors'
import { Suspense } from 'react'
import Spinner from '@/components/spinner'

export default function UserOnOrganization(props: UserOnOrganizationProps) {
  const { organizations } = props

  return (
    <Grid container spacing={2}>
      {organizations?.length > 0 ? (
        <Suspense fallback={<Spinner />}>
          {organizations?.map((organization: OrganizationType) => (
            <Grid key={organization?.id} item xs={12} sm={6} md={4}>
              <Card elevation={4}>
                <CardActionArea>
                  <CardContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Typography
                      variant='h6'
                      textTransform={'uppercase'}
                      color={blue[600]}
                    >
                      {organization?.name!}
                    </Typography>
                    <Typography variant='button'>
                      {organization?.cnpj!}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Suspense>
      ) : (
        <Grid item md={12}>
          <Typography variant='h4' textAlign={'center'}>
            Você ainda não possui uma organização!
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
