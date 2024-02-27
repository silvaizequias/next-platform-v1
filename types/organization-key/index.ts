import { OrganizationType } from '../organization'

export type OrganizationKeyType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  organizationId: string
  organization: OrganizationType | any
  expireIn: Date
  active: boolean
  authorizationKey: string
}
