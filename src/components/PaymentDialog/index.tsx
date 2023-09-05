import { Box, Button } from '@mui/material'
import ShowInDialog from '../ShowInDialog'
import { PaymentDialogProps } from './types'
import { StripeCheckoutSchemaType } from '@/schemas/stripe'
import toast from 'react-hot-toast'
import axios from 'axios'
import { getStipePromise } from '@/libraries/stripe'

export default function PaymentDialog(props: PaymentDialogProps) {
  const { invoice, open, onClose } = props

  const handleCheckout = async () => {
    if (invoice && invoice?.status == 'PENDING') {
      const stripePromise = await getStipePromise()
      const inputs: StripeCheckoutSchemaType = {
        invoiceId: invoice?.id!,
        amount: invoice?.amount!,
        service: invoice?.contract?.service?.name!,
        description: invoice?.contract?.service?.description!,
        userId: invoice?.contract?.user?.id!,
        userEmail: invoice?.contract?.user?.email!,
      }
      await axios
        .post(`/api/stripe/checkout-session`, inputs)
        .then(async (res) => {
          if (res.data?.session!) {
            stripePromise?.redirectToCheckout({
              sessionId: res.data?.session?.id!,
            })
          }
        })
        .catch((error: any) => {
          console.error(error?.message || error)
          toast.error(error?.message)
        })
    } else {
      toast.error('A fatura não está disponível para processar o pagamento')
    }
  }

  return (
    <ShowInDialog onClose={onClose} open={open}>
      <Box>
        <Button variant='contained' color='success' onClick={handleCheckout}>
          Pagar Fatura {invoice?.invoiceCode!}
        </Button>
      </Box>
    </ShowInDialog>
  )
}
