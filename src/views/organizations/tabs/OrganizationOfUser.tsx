import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import { OrganizationOfUserProps } from '../types'
import { OrganizationOfUserType } from '@/types/organization-of-user'
import { blue } from '@mui/material/colors'
import { Suspense } from 'react'
import Spinner from '@/components/spinner'

export default function OrganizationOfUser(props: OrganizationOfUserProps) {
  const { orgs } = props

  return (
    <Grid container>
      {orgs?.length > 0 ? (
        <Suspense fallback={<Spinner />}>
          {orgs?.map((org: OrganizationOfUserType) => (
            <Grid key={org?.id} item xs={12} sm={6} md={4}>
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
                      {org?.organization?.name!}
                    </Typography>
                    <Typography variant='button'>{org?.role!}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Suspense>
      ) : (
        <Grid item md={12}>
          <Typography variant='h4' textAlign={'center'}>
            Você ainda não é membro de nenhuma organização!
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
