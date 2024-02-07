import MyOrganizationsMainListView from '@/app/main/views/MyOrganizationsMainListView'
import { Grid, Stack, Typography, Paper } from '@mui/material'
import { blue } from '@mui/material/colors'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  subtitle?: string
  title: string
}
export default function PageDisplay(props: Props) {
  const { children, subtitle, title } = props

  return (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        sx={{
          minHeight: 60,
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
            padding: 4,
            maxWidth: 'md',
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            align="center"
            fontWeight={600}
            color={blue[400]}
            textTransform={'lowercase'}
          >
            {title}
          </Typography>
          <Typography
            component="small"
            variant="caption"
            align="center"
            fontWeight={200}
            textTransform={'lowercase'}
          >
            {subtitle}
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        component={Paper}
        elevation={6}
        square
        sx={{ height: '100vh', padding: 2 }}
      >
        <Stack gap={2} alignContent={'center'} alignItems={'center'}>
          {children}
        </Stack>
      </Grid>
    </Grid>
  )
}
