import { OrganizationUserType } from '../organization-user'

export type UserType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  subscriber: boolean
  suspended: boolean
  profile: 'guest' | 'consumer' | 'member' | 'master'
  name: string
  image: string
  email: string
  phone: string
  document: string
  accessCode: string
  passHash: string
  zipCode: string
  street: string
  complement: string
  latitude: number
  longitude: number
  organizations: OrganizationUserType[] | any
}
