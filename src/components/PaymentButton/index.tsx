import { Box, Button } from '@mui/material'
import { PaymentButtonProps } from './types'
import { useFetch } from '@/hooks/useFetch'
import { StripeCheckoutSchemaType } from '@/schemas/stripe'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { getStipePromise } from '@/libraries/stripe'

export default function PaymentButton(props: PaymentButtonProps) {
  const { id } = props
  const { data: invoice } = useFetch(`/api/invoices/${id}`)
  const [loading, setLoading] = useState(false)

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
      try {
        setLoading(true)
        const checkout = await axios.post(
          `/api/stripe/checkout-session`,
          inputs,
        )

        if (checkout.data) {
          stripePromise?.redirectToCheckout({
            sessionId: checkout.data.id,
          })
        }

        //window.location.href = checkout?.data?.url!
      } catch (error: any) {
        toast.error(error?.message)
        console.error(error)
      } finally {
        setLoading(false)
      }
    } else {
      toast.error('A fatura não está disponível para processar o pagamento')
    }
  }

  return (
    <Box sx={{ display: 'flex', px: 2 }}>
      <Button
        variant='contained'
        color={
          'primary' ||
          (invoice?.status! == 'PENDING' && 'warning') ||
          (invoice?.status! == 'INVOICED' && 'success')
        }
        size='small'
        disabled={loading}
        onClick={handleCheckout}
      >
        {invoice?.status! == 'PENDING'
          ? 'Pagar'
          : (invoice?.status! == 'CANCELED' && 'Cancelada') ||
            (invoice?.status! == 'INVOICED' && 'Paga')}
      </Button>
    </Box>
  )
}
