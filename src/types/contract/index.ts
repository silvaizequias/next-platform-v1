import { SolutionType } from '../solution'
import { UserType } from '../user'

export type ContractType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  softDeleted: string
  userId: string
  user: UserType
  solutionId: string
  solution: SolutionType
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripePriceId: string
  currentPeriodStart: Date
  currentPeriodEnd: Date
  note: string
  discount: number
  tax: number
  amount: number
  isActive: boolean
}
