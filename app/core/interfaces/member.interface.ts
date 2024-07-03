import { Organization } from './organization.interface'
import { User } from './user.interface'

export interface Member {
  id: string
  createdAt: Date
  updatedAt: Date
  role: string
  active: boolean
  userId: string
  user: User
  organizationId: string
  organization: Organization
}
