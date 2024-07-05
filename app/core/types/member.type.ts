import { Organization } from './organization.type'
import { User } from './user.type'

export type Member = {
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
