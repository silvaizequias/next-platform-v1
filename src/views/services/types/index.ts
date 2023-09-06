import { SolutionType } from '@/views/solutions/types'
import { SubscriptionType } from '@/views/subscriptions/types'

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
