import { ServiceType } from '@/views/control/services/types'
import { UserType } from '@/views/control/users/types'

export type SubscriptionType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  serviceId: string
  service: ServiceType
  userId: string
  user: UserType
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripePriceId: string
  currentPeriodStart: Date
  recurringInterval: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
  currentPeriodEnd: Date
  status:
    | 'INCOMPLETE'
    | 'INCOMPLETE_EXPIRED'
    | 'TRIALING'
    | 'ACTIVE'
    | 'PAST_DUE'
    | 'CANCELED'
    | 'UNPAID'
  description: string
  note: string
  discount: number
  tax: number
  amount: number
}

export interface SubscriptionCreateFormProps {
  onClose: () => void
}

export interface SubscriptionDataGridProps {
  subscriptions: SubscriptionType[]
}
