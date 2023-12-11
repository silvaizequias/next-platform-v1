import { ServiceOrderType } from '../order'

export type ServiceAttachmentType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  order: ServiceOrderType
  orderId: string
  code: string
  note: string
  file: string
}
