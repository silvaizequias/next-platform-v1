import { SubscriptionType } from '@/views/control/subscriptions/types'

export type ServiceType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  isAvaliable: boolean
  name: string
  description: string
  solution: string
  url: string
  price: number
  subscriptions: SubscriptionType[]
}

export interface ServiceCreateFormProps {
  onClose: () => void
}

export interface ServiceCardProps {
  service: ServiceType
}
