import { ContractType } from '@/views/contracts/types'
import { InvoiceType } from '@/views/invoices/types'

export interface AccountContractViewProps {
  id: string
}

export interface AccountInvoicesDataGridProps {
  invoices: InvoiceType[]
}

export interface AccountContractDetailProps {
  contract: ContractType
}
