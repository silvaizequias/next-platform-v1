import { Account } from '../accounts/types'
import { Organization } from '../organizations/types'

export type Member = {
  id: string
  createdAt: Date
  updatedAt?: Date
  role: string
  active: boolean
  accountId: string
  account: Account
  organizationId: string
  organization: Organization
}
