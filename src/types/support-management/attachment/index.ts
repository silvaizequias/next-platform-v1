import { SupportTicketType } from '../ticket'

export type SupportAttachmentType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  ticket: SupportTicketType
  ticketId: string
  code: string
  note: string
  file: string
}
