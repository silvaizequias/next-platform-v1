import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { SubscriptionServiceCardProps } from '../../types'
import { blue, green } from '@mui/material/colors'

export default function SubscriptionServiceCard(
  props: SubscriptionServiceCardProps,
) {
  const { service, user } = props

  return (
    <Card>
      <CardActionArea>
        <CardContent
          sx={{
            bgcolor: blue[900],
          }}
        >
          <Typography
            variant='body1'
            fontWeight={'500'}
            textAlign={'center'}
            textTransform={'uppercase'}
            color={'white'}
          >
            {service?.name!}
          </Typography>
          <Typography variant='h4' textAlign={'center'} color={green[600]}>
            R$ {service?.price.toLocaleString()}
          </Typography>
        </CardContent>
        <Divider
          sx={{ display: 'flex', justifyContent: 'center', pt: 2, mx: 2 }}
        >
          <Button variant='contained' size='small' color='success'>
            Contratar
          </Button>
        </Divider>
        <CardContent sx={{ my: 0 }}>
          <Typography
            variant='body2'
            color='text.secondary'
            textAlign={'center'}
          >
            {service?.description!}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
