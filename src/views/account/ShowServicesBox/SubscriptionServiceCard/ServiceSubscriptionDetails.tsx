import toast from 'react-hot-toast'
import { ServiceSubscriptionDetailsProps } from '../../types'
import { StripeCheckoutSchemaType } from '@/schemas/stripe'
import axios from 'axios'
import { getStipePromise } from '@/libraries/stripe'
import { Box, Button, Typography } from '@mui/material'

export default function ServiceSubscriptionDetails(
  props: ServiceSubscriptionDetailsProps,
) {
  const { user, service, onClose } = props

  const handleCheckout = async () => {
    const stripePromise = await getStipePromise()
    try {
      const inputs: StripeCheckoutSchemaType = {
        serviceId: service?.id!,
        serviceName: service?.name!,
        serviceDescription: service?.description!,
        serviceAmount: service?.price!,
        userId: user?.id!,
        userEmail: user?.email!,
      }
      const subscribe = await (
        await axios.post(`/api/stripe/checkout-session`, inputs)
      ).data

      if (subscribe) {
        await stripePromise?.redirectToCheckout({
          sessionId: subscribe?.id,
        })
      }
    } catch (error: any) {
      toast.error(error?.message)
      console.log(error)
    } finally {
      onClose()
    }
  }

  return (
    <Box>
      <Typography variant='body2' color='text.secondary' textAlign={'center'}>
        {service?.description!}
      </Typography>
      <Typography variant='body2' color='text.secondary' textAlign={'center'}>
        R$ {service?.price.toLocaleString()} mensais
      </Typography>
      <Button
        variant='contained'
        size='small'
        fullWidth
        color='success'
        onClick={handleCheckout}
      >
        Pagar
      </Button>
    </Box>
  )
}
