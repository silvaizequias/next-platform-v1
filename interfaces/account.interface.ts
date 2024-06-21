import { AccountRole } from '@/enum/role.enum'
import { Address } from './address.interface'

export interface Account extends Address {
  readonly id?: string
  readonly createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  softDeleted?: boolean
  active?: boolean
  role?: AccountRole
  name: string
  image?: string
  email: string
  phone: string
  secret?: string
  document?: string
}
