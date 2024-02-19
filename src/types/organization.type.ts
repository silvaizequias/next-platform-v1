import { OrganizationKeyType } from './organization-key.type'
import { OrganizationUserType } from './organization-user.type'
import { SubscriptionType } from './subscription.type'

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
  users: OrganizationUserType[] | any
  subscriptions: SubscriptionType[] | any
  authorizationKey: OrganizationKeyType
}
