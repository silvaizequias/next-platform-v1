import { SupportTicketType } from "../ticket"

export type SupportMessageType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  ticket: SupportTicketType
  ticketId: string
  to: string
  content: string
  read: boolean
  solved: boolean
}
