import { OrderType } from '../types'

export type OrderItemType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  orderId: string
  order: OrderType | any
  code: string
  note: string
  amount: number
  file: string
}
