import { InvoiceType } from '@/views/invoices/types'

export interface PaymentDialogProps {
  invoice: InvoiceType
  open: boolean
  onClose: () => void
}
