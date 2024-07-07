import { Address } from './address.type'

export type User = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  lastLogin: Date
  role: string
  name: string
  image: string
  email: string
  phone: string
  secret: string
  document: string
  address: Address
}
