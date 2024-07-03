import { Address } from './address.interface'

export interface User extends Address {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  role: string
  name: string
  image: string
  email: string
  phone: string
  secret: string
  document: string
}
