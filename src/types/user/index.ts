import { UserDocType, UserProfile } from '@prisma/client'
import { AccountType } from '../account'
import { ContractType } from '../contract'
import { OrganizationType } from '../organization'
import { OrganizationOfUserType } from '../organization-of-user'
import { SessionType } from '../session'

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
  accounts: AccountType[]
  contracts: ContractType[]
  organizations: OrganizationType[]
  orgs: OrganizationOfUserType[]
  sessions: SessionType[]
}
