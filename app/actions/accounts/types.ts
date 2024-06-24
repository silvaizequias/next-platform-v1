export type Account = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  softDeleted?: boolean
  active?: boolean
  role?: string
  name: string
  image?: string
  email: string
  phone: string
  secret?: string
  document?: string
}
