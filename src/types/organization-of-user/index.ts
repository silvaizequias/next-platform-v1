import { UserRole } from '@prisma/client'
import { OrganizationType } from '../organization'
import { UserType } from '../user'

export type OrganizationOfUserType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  softDeleted: string
  organizationId: string
  organization: OrganizationType
  userId: string
  user: UserType
  role: UserRole
  isAvaliable: boolean
}
