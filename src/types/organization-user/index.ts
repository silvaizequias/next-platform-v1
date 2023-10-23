import { UserRole } from '@prisma/client'
import { OrganizationType } from '../organization'
import { UserType } from '../user'

export type OrganizationUserType = {
  id: string
  createdAt: Date
  updatedAt: Date
  organizationId: string
  organization: OrganizationType
  userId: string
  user: UserType
  isActive: boolean
  role: UserRole
}
