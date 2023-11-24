import { UserRole } from '@prisma/client'
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

export type OrganizationType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  isActive: boolean
  name: string
  image: string
  email: string
  phone: string
  documentCode: string
  zipCode: string
  street: string
  complement: string
  district: string
  city: string
  state: string
  country: string
  latitude: number
  longitude: number
  users: OrganizationUserType[]
}
