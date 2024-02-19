import { OrganizationType } from './organization.type'

export type OrganizationKeyType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  organizationId: string
  organization: OrganizationType
  expireIn: Date
  active: boolean
  authorizationKey: string
}
