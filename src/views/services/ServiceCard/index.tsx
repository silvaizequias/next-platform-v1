import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import { ServiceCardProps } from '../types'
import { MdGppGood, MdGppMaybe, MdPerson } from 'react-icons/md'
import { blue, green, red } from '@mui/material/colors'

export default function ServiceCard(props: ServiceCardProps) {
  const { service } = props

  return (
    <Card>
      <CardActionArea>
        <CardContent
          sx={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 24,
          }}
        >
          <Typography variant='body1' mr={2}>
            {service?.name!}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {service?.isAvaliable! ? (
              <Stack color={green[400]}>
                <MdGppGood />
              </Stack>
            ) : (
              <Stack color={red[400]}>
                <MdGppMaybe />
              </Stack>
            )}
            <Stack color={blue[400]}>
              <Badge
                badgeContent={
                  service?.subscriptions?.length > 0
                    ? service?.subscriptions?.length
                    : 0
                }
                color='success'
              >
                <MdPerson/>
              </Badge>
            </Stack>
          </Box>
        </CardContent>
        <CardContent sx={{ my: 0 }}>
          <Typography variant='body2' color='text.secondary'>
            {service?.description!}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {service?.solution?.url!}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {service?.solution?.cloud!}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
