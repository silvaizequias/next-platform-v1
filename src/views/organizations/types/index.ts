import { OrganizationType } from '@/types/organization'
import { OrganizationOfUserType } from '@/types/organization-of-user'
import { UserType } from '@/types/user'
import { Session } from 'next-auth'

export interface OrganizationUserProps {
  user: UserType
}

export interface OrganizationOfUserProps {
  orgs: OrganizationOfUserType[]
}

export interface UserOnOrganizationProps {
  organizations: OrganizationType[]
}

export interface OrganizationDetailProps {
  organizationId: string
}

export interface OrganizationDetailViewProps {
  session: Session
  cnpj: string
}

export interface OrganizationProps {
  organization: OrganizationType
}

export interface MemberDataGridProps {
  users: OrganizationOfUserType[]
}
