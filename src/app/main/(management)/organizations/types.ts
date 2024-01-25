import { UserType } from '../users/types'

export type OrganizationType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  name: string
  image: string
  email: string
  phone: string
  document: string
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
  role: 'client' | 'assistant' | 'technician' | 'administrator' | 'owner'
  user: UserType
  userId: string
  organization: OrganizationType
  organizationId: string
}

export interface OrganizationProps {
  data: OrganizationType | OrganizationType[] | any
}

export interface MyOrganizationProps {
  data: OrganizationUsersType | OrganizationUsersType[] | any
}
