import { ServiceType } from '../service'
import { UserType } from '../user'

export type SubscriptionType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  userId: string
  user: UserType
  serviceId: string
  service: ServiceType
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripePriceId: string
  stripeCurrentPeriodEnd: Date
}
