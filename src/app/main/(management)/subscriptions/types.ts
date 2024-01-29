export type SubscriptionType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  code: string
  customerId: string
  subscriptionId: string
  document: string
  status: string
  recurrence: string
  currentPeriodEnd: Date
  spendLimit: number
  spending: number
  spendExceeded: boolean
  price: number
  priceId: string
}

export interface SubscriptionProps {
  data: SubscriptionType[] | SubscriptionType | any
}
