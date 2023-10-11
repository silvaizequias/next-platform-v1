import { OrganizationType } from '@/types/organization'
import { OrganizationOfUserType } from '@/types/organization-of-user'
import { UserType } from '@/types/user'

export interface OrganizationUserProps {
  user: UserType
}

export interface OrganizationOfUserProps {
  orgs: OrganizationOfUserType[]
}

export interface UserOnOrganizationProps {
  organizations: OrganizationType[]
}
