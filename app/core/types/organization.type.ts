import { Address } from './address.type'

export type Organization = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  active: boolean
  key: string
  name: string
  image: string
  email: string
  phone: string
  document: string
  address: Address
}
