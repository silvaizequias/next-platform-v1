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
import { useState } from 'react'
import ShowInDialog from '@/components/ShowInDialog'
import ServiceSubscriptionDetails from './ServiceSubscriptionDetails'

export default function SubscriptionServiceCard(
  props: SubscriptionServiceCardProps,
) {
  const { service, user } = props
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const handleShowDetail = () => {
    setShowDialog(!showDialog)
  }

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
          <Button
            variant='contained'
            size='small'
            color='success'
            onClick={handleShowDetail}
          >
            Contratar
          </Button>
        </Divider>
        <ShowInDialog open={showDialog} onClose={handleShowDetail} title={service?.name!}>
          <ServiceSubscriptionDetails
            user={user}
            service={service}
            onClose={handleShowDetail}
          />
        </ShowInDialog>
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
