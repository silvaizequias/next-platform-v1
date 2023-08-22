export type UserType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  isVerified: boolean
  isActive: boolean
  role: 'MASTER' | 'MEMBER' | 'CUSTOMER' | 'GUEST'
  passToken: string
  avatar: string
  name: string
  email: string
  phone: string
  docType: 'CPF' | 'CNPJ' | 'CNH' | 'CTPS' | 'PASSPORT'
  docCode: string
  zipCode: string
  street: string
  number: string
  complement: string
  zone: string
  district: string
  city: string
  state: string
}

export type UsersType = {
  users: UserType[]
}
