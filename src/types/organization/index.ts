import { OrganizationOfUserType } from '../organization-of-user'
import { SolutionOfOrganizationType } from '../solution-of-organization'
import { UserType } from '../user'

export type OrganizationType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  softDeleted: string
  userId: string
  user: UserType
  name: string
  cnpj: string
  image: string
  email: string
  phone: string
  zipCode: string
  street: string
  complement: string
  district: string
  city: string
  state: string
  latitude: number
  longitude: number
  users: OrganizationOfUserType[]
  solutions: SolutionOfOrganizationType[]
}
