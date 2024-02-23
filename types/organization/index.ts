import { OrganizationKeyType } from '../organization-key'
import { OrganizationUserType } from '../organization-user'
import { SubscriptionType } from '../subscription'

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
