import { Organization } from './organization.type'
import { User } from './user.type'

export type Address = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  zipCode: string
  street: string
  complement: string
  district: string
  city: string
  state: string
  country: string
  latitude: number
  longitude: number
  userId: string
  user: User
  organizationId: string
  organization: Organization
}
