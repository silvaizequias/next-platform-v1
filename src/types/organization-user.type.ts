import { OrganizationType } from './organization.type'
import { UserType } from './user.type'

export type OrganizationUserType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  role: 'client' | 'assistant' | 'technician' | 'administrator' | 'owner'
  user: UserType | any
  userId: string
  organization: OrganizationType | any
  organizationId: string
}
