import { UserProfile } from '@prisma/client'
import { OrganizationUsersType } from '../organizations/types'

export type UserType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  subscriber: boolean
  suspended: boolean
  api: string
  profile: UserProfile
  name: string
  image: string
  email: string
  phone: string
  documentType: 'cpf' | 'cnpj'
  documentCode: string
  accessCode: string
  passHash: string
  zipCode: string
  street: string
  complement: string
  latitude: number
  longitude: number
  organizations: OrganizationUsersType[]
}
