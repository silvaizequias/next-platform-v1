import { AuthorizationType } from '../authorization'

export type SolutionType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  name: string
  description: string
  apiUrl: string
  authorizations: AuthorizationType[]
}
