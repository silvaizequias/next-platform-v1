import { SupportTicketType } from '../ticket'

export type SupportCategoryType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  name: string
  description: string
  tickets: SupportTicketType[]
}
