import { SolutionType } from '../solution'
import { UserType } from '../user'

export type ApiKeyType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  softDeleted: string
  userId: string
  user: UserType
  solutionId: string
  solution: SolutionType
  expireIn: Date
  isActive: boolean
  description: string
  key: string
  secret: string
  dailyRequestLimit: number
  dailyRequests: number
  monthlyRequestLimit: number
  monthlyRequests: number
}
