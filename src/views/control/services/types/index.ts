import { SolutionType } from '@/views/control/solutions/types'
import { SubscriptionType } from '@/views/control/subscriptions/types'

export type ServiceType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  solutionId: string
  solution: SolutionType
  isAvaliable: boolean
  name: string
  description: string
  price: number
  subscriptions: SubscriptionType[]
}

export interface ServiceCreateFormProps {
  onClose: () => void
}

export interface ServiceCardProps {
  service: ServiceType
}
