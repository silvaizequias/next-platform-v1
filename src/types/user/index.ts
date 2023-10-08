import { UserDocType, UserProfile } from '@prisma/client'
import { SubscriptionType } from '../subscriptions'
import { OrganizationType } from '../organization'
import { OrganizationOfUserType } from '../organization-of-user'
import { ApiKeyType } from '../api-key'

export type UserType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  softDeleted: string
  profile: UserProfile
  isActive: boolean
  name: string
  email: string
  emailVerified: Date
  image: string
  phone: string
  docType: UserDocType
  docCode: string
  passHash: string
  zipCode: string
  complement: string
  latitude: number
  longitude: number
  apiKeys: ApiKeyType[]
  subscriptions: SubscriptionType[]
  organizations: OrganizationType[]
  orgs: OrganizationOfUserType[]
}
