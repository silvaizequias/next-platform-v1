import { Box, Button } from '@mui/material'
import { PaymentButtonProps } from './types'
import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'
import PaymentDialog from '../PaymentDialog'

export default function PaymentButton(props: PaymentButtonProps) {
  const { id } = props
  const { data: invoice } = useFetch(`/api/invoices/${id}`)
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const handleButtonClick = async () => {
    setShowDialog(!showDialog)
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
        onClick={handleButtonClick}
      >
        {invoice?.status! == 'PENDING'
          ? 'Pagar'
          : (invoice?.status! == 'CANCELED' && 'Cancelada') ||
            (invoice?.status! == 'INVOICED' && 'Paga')}
      </Button>
      <PaymentDialog
        open={showDialog}
        onClose={handleButtonClick}
        invoice={invoice!}
      />
    </Box>
  )
}
