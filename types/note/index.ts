import { OrderType } from "../order"

export type NoteType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  orderId: string
  order: OrderType | any
  content: string
  member: string
  customer: string
}