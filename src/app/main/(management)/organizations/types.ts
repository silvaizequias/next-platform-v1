import { OrganizationKeyType } from '../authorizations/types'
import { SubscriptionType } from '../subscriptions/types'
import { OrganizationUsersType } from './users/types'

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
  users: OrganizationUsersType[] | any
  subscriptions: SubscriptionType[] | any
  authorizationKey: OrganizationKeyType
}
