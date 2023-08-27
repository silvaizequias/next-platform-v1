import { ContractType } from '@/views/contracts/types'

export type ServiceType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  isActive: boolean
  serviceCode: string
  name: string
  solution: 'NONE'
  description: string
  price: number
  contracts: ContractType[]
}

export interface ServiceDataGridProps {
  services: ServiceType[]
}

export interface ServiceCreateFormProps {
  onClose: () => void
}
