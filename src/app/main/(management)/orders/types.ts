import { OrderAttachmentType } from './attachments/types'
import { OrderItemType } from './items/types'

export type OrderType = {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  softDeleted: boolean
  code: string
  observation: string
  organization: string
  customer: string
  member: string
  originZipCode: string
  originComplement: string
  originLatitude: number
  originLongitude: number
  destinationZipCode: string
  destinationComplement: string
  destinationLatitude: number
  destinationLongitude: number
  deadline: Date
  started: boolean
  startDate: Date
  startNote: string
  completed: boolean
  completionDate: Date
  completionNote: string
  canceled: boolean
  cancellationDate: Date
  cancellationNote: string
  attachments: OrderAttachmentType[] | any
  items: OrderItemType[] | any
}
