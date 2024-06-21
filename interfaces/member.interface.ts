import { MemberRole } from '@/enum/role.enum'
import { Account } from './account.interface'
import { Organization } from './organization.interface'

export interface Member {
  readonly id?: string
  readonly createdAt?: Date
  updatedAt?: Date
  role: MemberRole
  active: boolean
  accountId: string
  account: Account
  organizationId: string
  organization: Organization
}
