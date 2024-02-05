import { Grid, Paper, Stack, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { OrganizationUsersType } from '../(management)/organizations/users/types'
import MyOrganizationsMainListView from './MyOrganizationsMainListView'

interface Props {
  data: OrganizationUsersType[] | any
}

export default function MainPageView(props: Props) {
  const { data } = props

  return (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        sx={{
          minHeight: 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: 4,
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            fontWeight={600}
            color={blue[400]}
          >
            dedicado
          </Typography>
          <Typography
            component="h4"
            variant="h6"
            align="center"
            fontWeight={200}
          >
            sua melhor plataforma de serviços
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={6}
        square
        sx={{ height: '100vh' }}
      >
        <Stack gap={2} alignContent={'center'} alignItems={'center'}>
          <MyOrganizationsMainListView data={data} />
        </Stack>
      </Grid>
    </Grid>
  )
}
