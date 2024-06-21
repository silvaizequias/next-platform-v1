import { Address } from "./address.interface"

export interface Organization extends Address {
  readonly id?: string
  readonly createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  softDeleted?: boolean
  active?: boolean
  name: string
  image?: string
  email?: string
  phone?: string
  document: string
}
