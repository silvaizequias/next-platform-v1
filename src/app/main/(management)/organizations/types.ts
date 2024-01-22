import { UserRole } from '@prisma/client'
import { UserType } from '../users/types'

export type OrganizationType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  subscriber: boolean
  suspended: boolean
  name: string
  image: string
  email: string
  phone: string
  documentCode: string
  zipCode: string
  street: string
  complement: string
  latitude: number
  longitude: number
  users: OrganizationUsersType[]
}

export type OrganizationUsersType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  role: UserRole
  user: UserType
  userId: string
  organization: OrganizationType
  organizationId: string
}
