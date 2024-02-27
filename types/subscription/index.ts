import { OrganizationType } from '../organization'

export type SubscriptionType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  code: string
  customerId: string
  subscriptionId: string
  organizationId: string
  organization: OrganizationType | any
  status: string
  recurrence: string
  currentPeriodEnd: Date
  spendLimit: number
  spending: number
  spendExceeded: boolean
  price: number
  priceId: string
}
