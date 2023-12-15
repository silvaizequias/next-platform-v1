import { ServiceOrderType } from '../order'

export type ServiceItemType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  order: ServiceOrderType
  orderId: string
  code: string
  note: string
  amount: number
  file: string
}
