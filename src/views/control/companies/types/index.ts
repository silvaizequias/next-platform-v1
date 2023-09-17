import { UserType } from '@/views/control/users/types'
export type CompanyType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  isActive: boolean
  userId: string
  user: UserType
  name: string
  image: string
  email: string
  phone: string
  cnpj: string
  zipCode: string
  complement: string
}
