import { UserType } from '@/views/users/types'
import { InvoiceType } from '@/views/invoices/types'
import { ServiceType } from '@/views/services/types'

export type ContractType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  userId: string
  user: UserType
  serviceId: string
  service: ServiceType
  contractCode: string
  status: 'ACTIVE' | 'SUSPENDED' | 'FINISHED' | 'CANCELED'
  description: string
  note: string
  startedIn: Date
  period: 'MONTHLY' | 'QUARTERLY' | 'SEMESTERLY' | 'YEARLY'
  endedIn: Date
  payment: 'CARD' | 'ORDER' | 'PIX'
  discount: number
  invoices: InvoiceType[]
}

export interface ContractDataGridProps {
  contracts: ContractType[]
}

export interface ContractCreateFormProps {
  onClose: () => void
}
