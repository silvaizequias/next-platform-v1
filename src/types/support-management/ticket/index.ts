import { SupportAttachmentType } from "../attachment"
import { SupportCategoryType } from "../category"
import { SupportMessageType } from "../message"

export type SupportTicketType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  category: SupportCategoryType
  categoryId: string
  code: string
  status: string
  organization: string
  customer: string
  subject: string
  content: string
  attachments: SupportAttachmentType[]
  messages: SupportMessageType[]
}
