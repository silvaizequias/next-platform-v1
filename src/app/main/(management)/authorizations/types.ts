import { OrganizationType } from '../organizations/types'

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

export interface OrganizationKeyProps {
  data: OrganizationKeyType[] | OrganizationKeyType | any
}
