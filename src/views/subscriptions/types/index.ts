import { ServiceType } from '@/views/services/types'
import { UserType } from '@/views/users/types'

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
