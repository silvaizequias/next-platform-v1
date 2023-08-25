export type InvoiceType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  invoiceCode: string
  barCode: string
  qrCode: string
  status: 'PENDING' | 'INVOICED' | 'CANCELED'
  description: string
  note: string
  tax: number
  amount: number
  payUpTo: Date
  wasPaid: boolean
  paidAt: Date
}

export interface InvocesProps {
  invoices: InvoiceType[]
}
