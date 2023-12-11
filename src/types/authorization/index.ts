export type AuthorizationType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  solution: string
  organization: string
  role: string
  apiKey: string
  expireIn: Date
  isActive: boolean
}
