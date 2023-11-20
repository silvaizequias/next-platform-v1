import { ServiceRecurrence } from '@prisma/client'
import { SubscriptionType } from '../subscription'

export type ServiceType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  name: string
  solution: string
  description: string
  features: string
  price: number
  recurrence: ServiceRecurrence
  subscriptions: SubscriptionType[]
}
