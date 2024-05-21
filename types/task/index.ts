import { UserType } from '../user'

export type TaskType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  userId: string
  user: UserType
  code: string
  priority: 'low' | 'normal' | 'medium' | 'higth'
  status: 'planning' | 'open' | 'doing' | 'pending' | 'done' | 'closed'
  subject: string
  content: string
  deadline: Date
}
