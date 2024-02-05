import { UserType } from "../../users/types"
import { OrganizationType } from "../types"

export type OrganizationUsersType = {
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
