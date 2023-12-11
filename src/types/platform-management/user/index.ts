import { OrganizationUserType } from "../organization"

export type UserType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  isActive: boolean
  profile: string
  name: string
  image: string
  email: string
  phone: string
  documentCode: string
  accessCode: string
  passHash: string
  zipCode: string
  street: string
  complement: string
  district: string
  city: string
  state: string
  country: string
  latitude: number
  longitude: number
  organizations: OrganizationUserType[]
}
