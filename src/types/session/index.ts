import { UserType } from '../user'

export type SessionType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  softDeleted: string
  userId: string
  user: UserType
  sessionToken: string
  expires: Date
}
