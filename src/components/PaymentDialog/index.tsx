import ShowInDialog from '../ShowInDialog'
import { PaymentDialogProps } from './types'

export default function PaymentDialog(props: PaymentDialogProps) {
  const { invoice, open, onClose } = props

  return (
    <ShowInDialog onClose={onClose} open={open}>
      {invoice.invoiceCode}
    </ShowInDialog>
  )
}
